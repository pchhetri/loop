import React, { PropTypes } from 'react'
import s from './Login.css'
import history from '../../core/history'
import FontAwesome from 'react-fontawesome'
import { LOGIN_INIT, LOGIN_WORKING, LOGIN_OK } from '../../constants'

const Login = ({status, error, fields, handleChange, handleSubmit}) =>  {
  const { email, password } = fields
  const { spinnerClass, buttonClass, statusText } = getClassByStatus( status )

  return (
    <div className={s.wrapper}>
      <form className={s.login} onSubmit={ handleSubmit }>
        <div className={s.title}>
          Log in
          {error ? <div className={s.error}> {error} </div>: null}
        </div>
        <input value={email} onChange={(e) => handleChange('email', e)} type="text" placeholder="Username" autoFocus/>
        <i className="fa fa-user"></i>
        <input value={password} onChange={(e) => handleChange('password', e)} type="password" placeholder="Password" />
        <FontAwesome className={s.inputIcon} name="rocket"/>
        <button className={buttonClass}>
          <i className={spinnerClass}></i>
          <span className={s.statusText}>{ statusText }</span>
        </button>
      </form>
      </div>
  )
}

const getClassByStatus = ( status ) => {
  if (status  === LOGIN_INIT ) return {spinnerClass: s.spinner, buttonClass: s.button, statusText: 'Log In'}
  else if (status === LOGIN_WORKING ) return {spinnerClass: s.loadingSpinner, buttonClass: s.loadingButton, statusText: 'Authenticating'}
  else return {spinnerClass: s.okSpinner, buttonClass: s.okButton, statusText: 'Welcome Back!'}
}

export default Login
