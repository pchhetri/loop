import React, { Component } from 'react'

import { login } from '../../helpers/session'
import { redirectTo } from '../../helpers/navigation'

import Layout from '../../components/Layout'
import Login from '../../components/Login'
import Loading from '../../components/Loader'
import Error from '../../components/Error'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggingIn: false,
      error: null
    }
  }

  handleSubmit = (email, password) => {
    this.setState({loggingIn: true})
    login(email, password, this.loginSuccess, this.loginFailure)
  }

  loginSuccess = () => {
    redirectTo('/admin')
  }

  loginFailure = (errorMessage) => {
    const error = "Login error: " + errorMessage
    this.setState({loggingIn: false, error: error})
  }

  render() {
    const { loggingIn } = this.state

    return (
      <Layout admin>
        {
          loggingIn ?
            <Loading /> :
            <div>
              {this.state.error ? <Error message={this.state.error} /> : null}
              <Login handleSubmit={this.handleSubmit} error={this.error}/>
            </div>
        }
      </Layout>
    )
  }
}

export default LoginPage
