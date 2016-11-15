import firebase from 'firebase'
import globalConfig from '../.config'

const ORGANIZATIONS = 'organizations'
const LOCATIONS     = 'locations'
const USERS         = 'users'
const ROOMS         = 'rooms'
const REQUESTS      = 'requests'

const ONCE_VALUE    = 'value'


export function firebaseClient() {
  if (firebase.apps.length == 1) {
    return firebase // Don't initialize more than one client
  }

  const config = {
    apiKey: globalConfig.firebaseApiKey,
    authDomain: globalConfig.firebaseAuthDomain,
  }

  firebase.initializeApp(config)

  return firebase
}

export function fetchRoom(roomPin) {
  return firebaseClient()
    .database()
    .ref(ROOMS)
    .orderByKey()
    .once(ONCE_VALUE)
    .then(organizationsResponse => {
      const data = organizationsResponse.val()
      return Object.keys(data).map(function(val) {
        var org = data[val]
        org.key = val
        return org
      })
    })
}
