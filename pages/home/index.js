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
import Layout from '../../components/Layout'
import s from './styles.css';
import {title, html} from './index.md'
import Welcome from '../../components/Welcome'
import Loader from '../../components/Loader'
import history from '../../core/history'
import RequestConfirmation from '../../components/RequestConfirmation'
import {fetchRooms} from '../../core/firebaseApi'

class HomePage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  constructor(props) {
    super(props)
    this.state = {
      code: null,
      error: null
    }
    this.handleCode = this.handleCode.bind(this)
    this.onRequestHandler = this.onRequestHandler.bind(this)
  }

  handleCode(code) {
    this.setState({code: code})
    fetchRooms(this.onRequestHandler)
  }

  onRequestHandler(data) {
    const rooms = Object.values(data.val())
    const roomCodes = rooms.map(function(e) {
      return (e.pin);
    });
    if (roomCodes.includes(this.state.code)) {
      history.push(`/rooms/${this.state.code}`);
    } else {
      this.setState({error: true})
    }
  }

  render() {
    let errorMessage = null;
    if (this.state.error) {
      errorMessage = (
        <div className={s.error}>
          <p className={s.errorMsg}><strong>ERROR: </strong>Invalid room code, please try again.</p>
        </div>
      )
    }
    return (
      <Layout className={s.content}>
        {errorMessage}
        <Welcome onCode={this.handleCode} error={this.state.error}/>
      </Layout>
    );
  }

}

export default HomePage;
