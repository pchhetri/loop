/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import {title, html} from './index.md';
import Welcome from '../../components/Welcome'
import Loader from '../../components/Loader'
import NewRequest from '../../components/NewRequest'
import {fb} from '../../core/firebaseApi'
import RequestConfirmation from '../../components/RequestConfirmation'

class HomePage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  constructor(props) {
    super(props)
    this.state = {
      showHome: true,
      showLoader: null,
      showRequest: null,
      showConfirmation: null,
      room: null
    }
  }

  handleCode(code, id)
  {
    console.log('Room code entered was: ' + code);
    this.setState({showHome: false, showLoader: true});
    const db = fb.database();
    const ref = db.ref();
    const roomsRef = ref.child("rooms");
    const self = this;
    roomsRef.orderByChild("code").equalTo(123).on("child_added", function(snapshot) {
      console.log(snapshot.val());
      self.setState({
        room: snapshot.val(),
        showLoader: false,
        showRequest: true
      })
    });
  }

  handleNewRequest()
  {
    // Todo: Send request info to firebase
    this.setState({showRequest:false})
    this.setState({showConfirmation: true});
  }

  render() {
    const welcomePage = this.state.showHome
    const loader = this.state.showLoader
    const requestPage = this.state.showRequest
    const confirmationPage = this.state.showConfirmation

    return (
      <Layout className={s.content}>
        {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
        {welcomePage
          ? <Welcome onCode={this.handleCode.bind(this)}/>
          : null}
        {loader
          ? <Loader/>
          : null}
        {requestPage
          ? <NewRequest room={this.state.room} onRequest={this.handleNewRequest.bind(this)}/>
          : null}
        {confirmationPage
          ? <RequestConfirmation/>
          : null}
      </Layout>
    );
  }

}

export default HomePage;
