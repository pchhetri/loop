import React, { Component } from 'react'
import { login } from '../../helpers/session'
import s from './styles.css'
import { redirectTo } from '../../helpers/navigation'
import Layout from '../../components/Layout'
import Login from '../../components/Login'
import Loading from '../../components/Loader'
import { LOGIN_INIT, LOGIN_WORKING, LOGIN_OK } from '../../constants'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: { email: '', password: '' },
      loginStatus: LOGIN_INIT,
      error: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    document.title = 'Login'
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { email, password } = this.state.fields
    this.setState({loginStatus: LOGIN_WORKING})
    login(email, password, this.loginSuccess, this.loginFailure)
  }

  loginSuccess = () => {
    this.setState({loginStatus: LOGIN_OK})
    setTimeout(()=>{
       redirectTo('/admin')
    }, 1500)
  }

  loginFailure = (errorMessage) => {
    const error = "Login error: " + errorMessage
    this.setState({loginStatus: LOGIN_INIT, error: error})
  }

  handleChange = (field, event) => {
    const { fields } = this.state
    fields[field] = event.target.value

    this.setState(fields)
  }

  render() {
    const { loginStatus, error, fields } = this.state

    return (
      <Layout>
            <div>
              <div className={s.loginTitle}>
                <img className={s.logo} src='img/nodafi_icon.png'></img>
                <h2>NodaFi</h2>
              </div>
              <Login status={loginStatus}
                     error={error}
                     fields={fields}
                     handleChange={this.handleChange}
                     handleSubmit={this.handleSubmit}/>
            </div>
      </Layout>
    )
  }
}

export default LoginPage
