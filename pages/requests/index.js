import React from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader'
import NewRequest from '../../components/NewRequest'
import { fetchRoom, putRequests } from '../../core/firebaseApi'
import update from 'immutability-helper'
import history from '../../core/history'
import {NEW_REQUEST} from '../../constants'


class RequestPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      room: null,
      checked: null,
      textFieldValue: '',
    }
    this.handleNewRequest = this.handleNewRequest.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }


  componentDidMount() {
    const match = this.props.route.pattern.exec(window.location.pathname)
    const roomId = match[1]

    fetchRoom(roomId)
      .then((room) => {
        const checked = Object.keys(room.default_requests).map(check => false)
        this.setState({room, checked})
      })
   }


   handleNewRequest(){
     const selectedIssues = this.state.room.default_requests
                                      .filter((req, index) => this.state.checked[index])
                                      .map(issue => ({description: issue.description,
                                                      comments: this.state.textFieldValue,
                                                      room_id: this.state.room.id,
                                                      location_id: this.state.room.location_id,
                                                      type_id: issue.type_id,
                                                      status: NEW_REQUEST,
                                                    }))
     putRequests(selectedIssues)
     history.push(`/requests/confirmation`);

   }

   handleCheck(event){
     const index = event.target.value
     const checked = this.state.checked
     checked[index] = !checked[index]
     this.setState({checked})
   }

   handleTextChange(event){
     this.setState({textFieldValue: event.target.value})
   }


  render() {
    const {room, textFieldValue} = this.state
    return (
      <Layout>
        {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
        {room ? <NewRequest room={room} onRequest={this.handleNewRequest}
                                        onCheck={this.handleCheck}
                                        value={textFieldValue}
                                        handleTextChange={this.handleTextChange}/>
                     : <Loader/>}
      </Layout>
    )
  }

}

export default RequestPage;
