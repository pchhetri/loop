import React, { PropTypes } from 'react'
import s from './Login.css'
import history from '../../core/history'
import { Textfield, Button } from 'react-mdl'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (field, event) => {
    const fields = {}
    fields[field] = event.target.value

    this.setState(fields)
  }

  handleSubmit = (event) => {
    const { email, password } = this.state

    this.props.handleSubmit(email, password)
  }

  render() {
    return (
      <div className={s.loginBox}>
      <h2>Sign in to NodaFi Below</h2>
        <div className={s.email}>
            <Textfield
              onChange={() => {}}
              label="Email"
              value={this.state.email}
              onChange={(e) => this.handleChange('email', e)}
              floatingLabel
              style={{width: '200px'}}/>
        </div>
        <div className={s.password}>
            <Textfield
              onChange={() => {}}
              label="Password"
              type='password'
              value={this.state.password}
              onChange={(e) => this.handleChange('password', e)}
              floatingLabel
              style={{width: '200px'}}/>
        </div>
        <div className={s.loginSubmit}>
          <Button raised ripple colored onClick={this.handleSubmit}>LOGIN</Button>
        </div>
      </div>
    )
  }
}

export default Login
