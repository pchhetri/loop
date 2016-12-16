import firebase from 'firebase'

import globalConfig from '../config'
import { redirectTo } from './navigation'
import { firebaseClient } from '../core/firebaseApi'

export const CURRENT_USER = 'nodafi::currentUser'


export const authenticate = () => {
  const user = currentUser()

  if (!user) {
    redirectTo('/login')
    return false
  }

  return user
}

export const currentUser = () => {
  const sessionData = sessionStorage[CURRENT_USER]

  let user = null

  try {
    user = sessionData && JSON.parse(sessionData)
  } catch (e) {
    console.warn('Failed to load current user', e)
  }

  return user
}

export const setCurrentUser = (user) => {
  try {
    sessionStorage[CURRENT_USER] = JSON.stringify(user)
  } catch (e) {
    console.warn('Failed to set current user', e)
    return false
  }
}

export const destroySession = () => {
  delete sessionStorage[CURRENT_USER]
}

export const toLogout = () => {
  redirectTo('/logout')
}

export const login = (email, password, loginSuccessCallback, loginFailureCallback) => {
  const firebase = firebaseClient()

  firebase
    .auth()
    .onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photo_url,
        }
        user.getToken().then((token) => {
          userData.token = token
          setCurrentUser(userData)
        })
      }
    })

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(loginSuccessCallback)
    .catch((error) => {
      loginFailureCallback(error.message)
    })
}
