import firebase from 'firebase'
import globalConfig from '../config'
import { NEW_REQUEST, ACK_REQUEST, IGNORED_REQUEST, SATISFIED_REQUEST } from '../constants'


const ORGANIZATIONS = 'organizations'
const LOCATIONS     = 'locations'
const USERS         = 'users'
const ROOMS         = 'rooms'
const REQUESTS      = 'requests'
const ID      = 'id'

const VALUE    = 'value'
const CHILD_ADDED    = 'child_added'
const CHILD_CHANGED    = 'child_changed'

const PIN = "pin" //room.pin
const LOCATION_ID = "location_id"
const ROOM_ID = "room_id"


export function firebaseClient() {
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
      .once(VALUE)
      .then(roomsRes => {
          const rooms = roomsRes.val()
          return rooms ? rooms[Object.keys(rooms)[0]] : null  //grabs the first room since FB gives us multiple objects
        })
  }


  export function fetchRoomsByIdAndLocation(roomIds, location_id) {
    return firebaseClient()
      .database()
      .ref(ROOMS)
      .orderByChild(LOCATION_ID)
      .equalTo(location_id)
      .once(VALUE)
      .then(roomsRes => Object.values(roomsRes.val()).filter(room => roomIds.includes(room.id))
                                                     .reduce((prevRoom, currRoom) => arrayToObject(prevRoom, currRoom), {}))
  }

  export function fetchRoomsById(cache, roomId) {
    const cachedRoom = cache.get(roomId)
    return cachedRoom !== undefined ? cachedRoom :
    firebaseClient()
      .database()
      .ref(ROOMS)
      .orderByKey()
      .equalTo(roomId)
      .once(VALUE)
      .then(roomRes => {
          const room = roomRes.val()
          return room ? room[Object.keys(room)] : null  //grabs the first room since FB gives us multiple objects
        })
  }

  export function fetchRequestsByLocation(location_id) {
    return firebaseClient()
      .database()
      .ref(REQUESTS)
      .orderByChild(LOCATION_ID)
      .equalTo(location_id)
      .once(VALUE)
      .then(res => res)
  }

  export function streamRequests(eventType, locationId, successCallback) {
    firebaseClient()
      .database()
      .ref(REQUESTS)
      .orderByChild(LOCATION_ID)
      .equalTo(locationId)
      .on(eventType, successCallback)
  }

  export function streamRequestOff(event_type, callbackFunction) {
    firebaseClient().database().ref(REQUESTS).off(event_type, callbackFunction)
  }

  export function fetchRooms(successCallback) {
      return firebaseClient()
        .database()
        .ref(ROOMS)
        .orderByChild(PIN)
        .once(VALUE, successCallback)
    }

  //Add a new request to Firebase
  export function putRequests(requests) {
    //Add id (via 1st map),  timestamps (via 2nd map), format for update (via reduce)
    const updateRequests = requests.map(request => Object.assign(request, {id: firebase.database().ref(REQUESTS).push().key}))
                                   .map(withTimestamps)
                                   .reduce((prevRequest, currRequest) => updateFormatter(prevRequest, currRequest, REQUESTS), {})

    return firebase.database().ref().update(updateRequests)
  }

  //Add a new request to Firebase
  export function updateRequestStatus(requestId, status) {
    let updateRequest = {status: status, updated: firebase.database.ServerValue.TIMESTAMP}

    if(status === ACK_REQUEST || status === IGNORED_REQUEST) updateRequest.ack_time = firebase.database.ServerValue.TIMESTAMP

    return firebase.database().ref(`${REQUESTS}/${requestId}`).update(updateRequest)
  }


//Helper function to add timestamps to firebase objects
function withTimestamps(obj){
  return Object.assign(obj, {created:firebase.database.ServerValue.TIMESTAMP,
                             updated: firebase.database.ServerValue.TIMESTAMP})
}

/****
  Takes an array of firebase objects (or single object) and formats it in
  firebase-friendly update formats
  Ex:
    path = "requests"
    [0: {id: k23413-, data:"hi"},
     1: {id: k54225-, data:"bye"}] --updateFormatter ---->

    {requests/k23413: {id: k23413-, data:"hi"},
     requests/k54225: {id: k54225-, data:"bye"}} -->Ready to send!
***/
function updateFormatter(prevObj, currObj, path) {
  const key = path + '/' + currObj.id
  prevObj[key] = currObj
  return prevObj
}

function arrayToObject(prevObj, currObj) {
  prevObj[currObj.id] = currObj
  return prevObj
}
