import React from 'react'
import Layout from '../../components/Layout'
import s from './styles.css'
import { title, html } from './index.md'
import ContentCard from '../../components/ContentCard/ContentCard'
import PictureRow from '../../components/PictureRow/PictureRow'
import Footer from '../../components/Footer/Footer'
import Loader from '../../components/Loader/Loader'
import { Tabs, Tab, Badge } from 'react-mdl'
import ReactTooltip from 'react-tooltip'
import { Chart } from 'react-google-charts'
import colors from '../../constants/colors'
import { toLogout } from '../../helpers/session'
import MetricText from '../../components/MetricText/MetricText'
import { streamRequests ,fetchRoomsByIdAndLocation, updateRequestStatus, streamRequestOff } from '../../core/firebaseApi'
import { NEW_REQUEST, ACK_REQUEST, IGNORED_REQUEST, SATISFIED_REQUEST, ON_VALUE } from '../../constants'
import moment from 'moment'
import { authenticate, currentUser } from '../../helpers/session'

const dataTypes = {
  SOLVED_ISSUES: 0,
  AVG_RESPONSE_TIME: 1,
  ACTIVE_ISSUES: 2,
  NEW_ISSUES: 3,
}


const smallContentCards = [
  {
    title: 'Issues Solved Today',
    color: colors.brightGreen,
    iconName: "check",
    dataType: dataTypes.SOLVED_ISSUES,
    unit: "",
  },
  {
    title: 'Average Response Time',
    color: colors.lightTeal,
    iconName: "alarm",
    dataType: dataTypes.AVG_RESPONSE_TIME,
    unit: "min",
  },
  {
    title: 'All Active Issues',
    color: colors.lightBlue,
    iconName: "info",
    dataType: dataTypes.ACTIVE_ISSUES,
    unit: "",
  },
  {
    title: 'New Issues',
    color: colors.brightGreen,
    iconName: "notifications",
    dataType: dataTypes.NEW_ISSUES,
    unit: "",
  },
]

const graphOptions = {
  legend: {
    positon: 'bottom',
    textStyle: {fontSize: 16}
  },
  pieHole: 0.40,
}


class AdminPage extends React.Component {

  constructor(props) {
    super(props)

    this.actionButtons = [
      [
        {iconName: 'visibility', color:'rgba(0, 0, 255, 0.5)', clickHandler: this.handleRequestAck},
        {iconName: 'delete', color: 'rgba(255, 0, 0, 0.5)', clickHandler: this.handleRequestIgnore},
      ],
      [
        {iconName: 'check', color:'rgba(0, 255, 0, 0.5)', clickHandler: this.handleRequestSatisfied},
        {iconName: 'delete', color: 'rgba(255, 0, 0, 0.5)', clickHandler: this.handleRequestIgnore},
      ],
      [ //No icons for the third tab column
      ],
    ]

    this.state = {
      user: null,                         //TODO: populate with user
      requests: [],
      numOfActiveRequests: 0,
      location: {                         //TODO: populate with acutal location
                  created : 1479353675672,
                  id : "-KWkLPlvltKizSvBJfN_",
                  name : "College Library",
                  organization_id : "-KWkLPlvltKizSvBJfNZ",
                  updated : 1479353675672
                },
      activeTab: 0,
      roomPerRequestData: [],
      unseenNewIssues: 0,
      newTabOpen: true,
      isNotificationOn: true,
    }

    this.onRequestHandler = this.onRequestHandler.bind(this)
    this.handleRequestTabChange = this.handleRequestTabChange.bind(this)
    this.handleRequestAck = this.handleRequestAck.bind(this)
    this.handleRequestIgnore = this.handleRequestIgnore.bind(this)
    this.handleRequestSatisfied = this.handleRequestSatisfied.bind(this)
    this.bindDataTypes = this.bindDataTypes.bind(this)
    this.handleNotificationStatus = this.handleNotificationStatus.bind(this)
  }

  componentWillMount() {
    authenticate()
  }


  componentDidMount() {
    document.title = "NodaFi Admin"
    streamRequests(ON_VALUE, this.state.location.id, this.onRequestHandler)
  }

  componentWillUnmount () {
    streamRequestOff(ON_VALUE, this.onRequestHandler)
  }



  onRequestHandler(reqSnapshot){
    const requests = Object.values(reqSnapshot.val())
    //Grab each room from the requests and extract the roomIds, removing duplicates
    const roomIds = Object.keys(requests.map(request => request.room_id)
                                        .reduce ((roomIds, newRoomId) =>
                                            {
                                              roomIds[newRoomId] = newRoomId
                                              return roomIds
                                            }, {}
                                          ))
    fetchRoomsByIdAndLocation(roomIds, this.state.location.id).then((rooms)=>{
      const requestsWithRooms = requests.map(request => {
                                                          request.room = rooms[request.room_id]
                                                          return request
                                                        })
      const currActiveCount = requestsWithRooms.reduce((prevValue, currReq) => {
                                                            const isActive = currReq.status === 0 || currReq.status == 1
                                                            if(isActive) prevValue++
                                                            return prevValue
                                                        }, 0)
      const requestsCountPerRoom = Array.from(requests.reduce(requestsPerRoom, new Map()))
                                                      .map(map=>{
                                                        return [map[1].label, map[1].count]
                                                      })

      const graphData =[["Room", "Request Count"], ...requestsCountPerRoom]

      const sortedRequests = requestsWithRooms.sort((curr, next) => next.created - curr.created)

      if ( document.getElementById("notificationAudio") &&
           sortedRequests.filter(requestFilter(NEW_REQUEST)).length >
           this.state.requests.filter(requestFilter(NEW_REQUEST)).length &&
           this.state.isNotificationOn) {
              document.getElementById("notificationAudio").play()
      }

      const unseenNewIssues = this.state.newTabOpen ? 0 : this.state.unseenNewIssues + sortedRequests.length - this.state.requests.length

      this.setState({requests: sortedRequests, numOfActiveRequests: currActiveCount, roomPerRequestData: graphData, unseenNewIssues: unseenNewIssues})
    })
  }

  handleRequestTabChange(tabId){
    if (tabId === NEW_REQUEST) {
      const unseenNewIssues = 0
      this.setState({ activeTab: tabId, newTabOpen: true, unseenNewIssues: unseenNewIssues })
    }
    else {
      this.setState({ activeTab: tabId, newTabOpen: false })
    }
  }


  //TODO: Definitely could consolidate these.. too lazy right now though
  handleRequestAck(event){
    event.preventDefault()
    const requestId = event.currentTarget.value
    updateRequestStatus(requestId, ACK_REQUEST)
  }

  handleRequestIgnore(event){
    event.preventDefault()
    const requestId = event.currentTarget.value
    updateRequestStatus(requestId, IGNORED_REQUEST)
  }

  handleRequestSatisfied(event){
    event.preventDefault()
    const requestId = event.currentTarget.value
    updateRequestStatus(requestId, SATISFIED_REQUEST)
  }

  handleNotificationStatus(){
    console.log(this.state.isNotificationOn)
    this.setState({isNotificationOn: !this.state.isNotificationOn})
  }

  getMuteStatus(){
    console.log(this.state.isNotificationOn)
    this.setState({isNotificationOn: !this.state.isNotificationOn})
  }

  menuOptions = [
                  {action: this.handleNotificationStatus.bind(this), textFunction: () => this.state.isNotificationOn ? 'Mute' : 'Unmute'},
                  {action: toLogout, textFunction: ()=>'Logout'},
                ]

  bindDataTypes(contentCard){
    const { SOLVED_ISSUES, ACTIVE_ISSUES, NEW_ISSUES, AVG_RESPONSE_TIME } = dataTypes

    switch (contentCard.dataType) {
      case SOLVED_ISSUES:
        contentCard.data = this.state.requests.filter(requestFilter(SATISFIED_REQUEST)).filter(updatedToday).length
        break

      case ACTIVE_ISSUES:
        contentCard.data = this.state.requests.filter(requestFilter(NEW_REQUEST)).length + this.state.requests.filter(requestFilter(ACK_REQUEST)).length
        break

      case NEW_ISSUES:
        contentCard.data = this.state.requests.filter(requestFilter(NEW_REQUEST)).length
        break

      case AVG_RESPONSE_TIME:
        const reqWithAckTime = this.state.requests.filter(request => request.ack_time ? true : false)
        const avgResponseTime = reqWithAckTime.reduce(totalResponseTime, 0) / reqWithAckTime.length
        contentCard.data = avgResponseTime.toFixed(2)
        break

      default:
        contentCard.data = ""
        break
    }
    return contentCard
  }

  render() {
    const req_status = mapTabToFilter(this.state.activeTab)
    const user = currentUser()
    return (
      <Layout className={s.content} adminInfo={user} menuOptions={this.menuOptions} handleNotificationStatus={this.handleNotificationStatus} isNotificationOn={this.state.isNotificationOn}>
        <div className={s.smallCardContainer}>
          {smallContentCards.map(this.bindDataTypes).map(renderSmallCards)}
        </div>
        <div className={s.largeCardContainer}>
          {renderLargeCard('Requests By Room', colors.brightGreen,
                                               "assessment",
                                               graphOptions,
                                               this.state.roomPerRequestData)}
          {renderActiveRequests('Currently Active Issues', colors.redMedium,
                                'list',
                                this.state.requests.filter(requestFilter(req_status)),
                                this.actionButtons[this.state.activeTab],
                                this.state.activeTab,
                                this.handleRequestTabChange,
                                req_status,
                                this.state.unseenNewIssues)}
        </div>
        <div>
          <ReactTooltip />
          <audio id="notificationAudio">
            <source src="good-news.mp3" type="audio/mpeg"/>
          </audio>
        </div>
      </Layout>
    )
  }
}

const renderSmallCards = ({title, color, iconName, data, unit}, key) => (
  <div key={key} className={s.smallCard}>
    <ContentCard title={title} color={color} iconName={iconName}>
      <div className={s.metricText}>
        <MetricText mainText={data} subText={unit}/>
      </div>
    </ContentCard>
  </div>
)

const renderLargeCard = (title, color, iconName, graphOptions, graphData) => (
  <div className={s.largeCard}>
    <ContentCard title={title} color={color} iconName={iconName} className={s.graphCard}>
      {graphData && graphData.length > 0 ? renderPieChart(graphOptions, graphData) :
                                           <Loader/>}
    </ContentCard>
  </div>
)

const renderActiveRequests = (title, color, iconName, requests, actionButtons, activeTab, changeTab, status, unseenNewIssues) => (
  <div className={s.largeCard}>
    <ContentCard title={title} color={color} iconName={iconName} header={requestCardHeader(activeTab, changeTab, unseenNewIssues)}>
      {requests ? requests.map((request, key) => renderRequestRow(request, key, actionButtons, status)) : <Loader />}
    </ContentCard>
  </div>
)


const requestCardHeader = (activeTab, changeTab, unseenNewIssues) => (
  <Tabs activeTab={activeTab} onChange={tabId => changeTab(tabId)} ripple>
               <Tab className={activeTab === 0 ? s.activeTab : s.inactiveTab}
                    data-tip="New issues."
                    data-type="info"
                    data-place="bottom"
                    data-delay-show='500'>{unseenNewIssues > 0 ? <Badge text={unseenNewIssues}>NEW</Badge>
                                                               : 'NEW'}</Tab>

               <Tab className={activeTab === 1 ? s.activeTab : s.inactiveTab}
                    data-tip="Issues that have been acknowledged by staff."
                    data-type="info"
                    data-place="bottom"
                    data-delay-show='500'>ACKNOWLEDGED</Tab>

               <Tab className={activeTab === 2 ? s.activeTab : s.inactiveTab}
                    data-tip="Issues that have been settled."
                    data-type="info"
                    data-place="bottom"
                    data-delay-show='500'>SATISFIED</Tab>
           </Tabs>
)

const renderRequestRow = (request, key, actionButtons, status) => {
  const isHighPriority = moment().diff(request.created, 'minutes') > 45 && status !== SATISFIED_REQUEST ? true : false
  const timeDiff = moment(request.created).fromNow()
  return  (<PictureRow className={s.pictureRow} key={key}
              info={request.description}
              name={request.room.name}
              detail={request.room.detail}
              picURL={request.room.image_url}
              actionButtons={actionButtons}
              value={request.id}
              isHighPriority={isHighPriority}
              time={timeDiff}/>)

}

const renderPieChart = (options, data) => {
    return(
    <Chart  chartType="PieChart"
            options={options}
            data={data}
            width="90%"
            height="90%"/>)
}

//TODO: Extract these into a separate "helper section"
const requestsPerRoom = (requestCountMap, request) => {
  if(!requestCountMap.get(request.room_id)) {
    requestCountMap.set(request.room_id, {
                                          label: `${request.room.name} - ${request.room.detail}`,
                                          count: 0,
                                        })
  }

  requestCountMap.get(request.room_id).count++
  return requestCountMap

}

// 2nd tab (id = 2) is SATISFIED but SATISFIED_REQUEST == 3, so have to map
// it differently
const mapTabToFilter = tabId => (
  tabId === 2 ? SATISFIED_REQUEST : tabId
)

const requestFilter = status => (
  request => request.status === status
)

const totalResponseTime = (prevTotal, currReq, index, array) => {
    const currResponseTime = moment(currReq.ack_time).diff(moment(currReq.created), 'minutes', true)
    return (currResponseTime + prevTotal)
}

const updatedToday = data => {
  //Moment is stupid and mutates the object when you call a function (WHY?!) so
  //we have to make copies of everything
  const dayStart = moment().startOf('day')
  const dayEnd = moment().endOf('day')
  return moment(data.updated).isBetween(dayStart, dayEnd, null, '[]')
}

export default AdminPage
