import React, { Component } from 'react'
import { destroySession } from '../../helpers/session'
import { redirectTo } from '../../helpers/navigation'
import { firebaseClient } from '../../core/firebaseApi'

import Layout from '../../components/Layout'

class LogoutPage extends Component {
  componentWillMount() {
    firebaseClient().auth().signOut()
    destroySession()
    redirectTo('/login')
  }

  componentDidMount() {
    document.title = 'Nodafi Admin'
  }

  render() {
    return (
      <Layout admin></Layout>
    )
  }
}

export default LogoutPage
