import globalConfig from '../config'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: globalConfig.firebase.apiKey,
  authDomain: globalConfig.firebase.authDomain,
  databaseURL: globalConfig.firebase.databaseUrl
};

export const fb = firebase.initializeApp(firebaseConfig);
