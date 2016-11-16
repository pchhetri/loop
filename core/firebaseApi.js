import firebase from 'firebase'
import globalConfig from '../config'

const ORGANIZATIONS = 'organizations'
const LOCATIONS     = 'locations'
const USERS         = 'users'
const ROOMS         = 'rooms'
const REQUESTS      = 'requests'

const ONCE_VALUE    = 'value'

const PIN = "pin" //room.pin


const firebaseClient = () => {
  if (firebase.apps.length == 1) {
    return firebase // Don't initialize more than one client
  }

  const config = {
    apiKey: globalConfig.firebase.apiKey,
    authDomain: globalConfig.firebase.authDomain,
    databaseURL: globalConfig.firebase.databaseURL,
  }

  firebase.initializeApp(config)

  return firebase
}

export function fetchRoom(roomCode) {
  return firebaseClient()
    .database()
    .ref(ROOMS)
    .orderByChild(PIN)
    .equalTo(roomCode)
    .once(ONCE_VALUE)
    .then(roomArrayRes => {
        const roomArray = roomArrayRes.val();
        return roomArray ? roomArray[0] : null
      })
  }
