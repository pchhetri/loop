/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import Layout from '../../components/Layout'
import s from './styles.css'
import { title, html } from './index.md'
import ContentCard from '../../components/ContentCard/ContentCard'
import PictureRow from '../../components/PictureRow/PictureRow'
import Footer from '../../components/Footer/Footer'
import Loader from '../../components/Loader/Loader'
import colors from '../../constants/colors'
import MetricText from '../../components/MetricText/MetricText'
import { streamRequests, fetchRoomsByIdAndLocation } from '../../core/firebaseApi'
import moment from 'moment'

const smallContentCards = [
  {
    title: 'Issues Solved Today',
    color: colors.brightGreen,
    iconName: "check",
    data: 7,
    unit: "",
  },
  {
    title: 'Average Response Time',
    color: colors.lightTeal,
    iconName: "check",
    data: 21.5,
    unit: "min",
  },
  {
    title: 'Current Active Issues',
    color: colors.lightBlue,
    iconName: "check",
    data: 5,
    unit: "",
  },
  {
    title: 'Issues Soved Today',
    color: colors.brightGreen,
    iconName: "check",
    data: 2,
    unit: "",
  },
]


class AdminPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null,                         //TODO: populate with user
      requests: [],
      location: {                         //TODO: populate with acutal location
                  created : 1479353675672,
                  id : "-KWkLPlvltKizSvBJfN_",
                  name : "College Library",
                  organization_id : "-KWkLPlvltKizSvBJfNZ",
                  updated : 1479353675672
                }
    }

    this.onRequestHandler.bind(this)

  }


  componentDidMount() {
    streamRequests(this.state.location.id, this.onRequestHandler.bind(this))
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
                                                          console.log(`Req room: ${request.room_id}`)
                                                          return request
                                                        })
      this.setState({requests: requestsWithRooms})
    })
  }


  render() {
    return (
      <Layout className={s.content}>
        <div className={s.smallCardContainer}>
          {smallContentCards.map(renderSmallCards)}
        </div>
        <div className={s.largeCardContainer}>
          {renderLargeCard('Requests By Room', colors.brightGreen, "check")}
          {renderActiveRequests('Currently Active Issues', colors.redMedium, "check", this.state.requests)}
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

const renderLargeCard = (title, color, iconName) => (
  <div className={s.largeCard}>
    <ContentCard title={title} color={color} iconName={iconName}>
    </ContentCard>
  </div>
)

const renderActiveRequests = (title, color, iconName, requests) => {
  return(
  <div className={s.largeCard}>
    <ContentCard title={title} color={color} iconName={iconName}>
      <div className='' />
      {requests ? requests.map((request, key) => renderRequestRow(request, key)) : <Loader />}
      <div/>
    </ContentCard>
  </div>
)
}

const renderRequestRow = (request, key) => {
  const isHighPriority = moment().diff(request.created, 'minutes') > 45 ? true : false
  const timeDiff = moment(request.created).fromNow()
  return  (<PictureRow key={key}
              info={request.description}
              name={request.room.name}
              detail={request.room.detail}
              picURL={request.room.image_url}
              isHighPriority={isHighPriority}
              time={timeDiff}/>)

}

export default AdminPage
