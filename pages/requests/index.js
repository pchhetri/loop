import React from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader'
import NewRequest from '../../components/NewRequest'
import { fetchRoom } from '../../core/firebaseApi'
import update from 'immutability-helper'


class RequestPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      room: null,
      checked: null,
    }
    this.handleNewRequest = this.handleNewRequest.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }


  componentDidMount() {
    const match = this.props.route.pattern.exec(window.location.pathname)
    const roomId = match[1]

    fetchRoom(roomId)
      .then((room) => {
        console.log(room)
        const checked = Object.keys(room.default_requests).map(check => false)
        this.setState({room, checked})
      })
   }


   handleNewRequest(){
     const selectedIssues = this.state.room.default_requests.filter((req, index) => this.state.checked[index])
     console.log(selectedIssues)
   }

   handleCheck(event){
     const index = event.target.value
     const checked = this.state.checked
     checked[index] = !checked[index]
     this.setState({checked})
   }


  render() {
    const {room} = this.state
    return (
      <Layout>
        {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
        {room ? <NewRequest room={room} onRequest={this.handleNewRequest} onCheck={this.handleCheck}/>
                     : <Loader/>}
      </Layout>
    )
  }

}

export default RequestPage;
