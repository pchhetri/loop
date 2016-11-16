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
import Loader from '../../components/Loader'
import NewRequest from '../../components/NewRequest'
import { fetchRoom } from '../../core/firebaseApi'

class RequestPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      room: null,
    }
  }


  componentDidMount() {
    const match = this.props.route.pattern.exec(window.location.pathname)
    const roomId = match[1]

    fetchRoom(roomId)
      .then(room => {
        this.setState({room})
      })
   }


  render() {
    room = this.state
    return (
      <Layout>
        {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
        {room ? <NewRequest room={room} onRequest={this.handleNewRequest.bind(this)}/>
                     : <Loader/>}
      </Layout>
    )
  }

}

export default HomePage;
