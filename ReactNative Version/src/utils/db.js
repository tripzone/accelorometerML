import * as firebase from 'firebase';

const initializeFirebase = () => {
  const config = {
    apiKey: process.env.APIKEY,
    authDomain: 'motionpredict.firebaseapp.com',
    databaseURL: 'https://motionpredict.firebaseio.com',
    projectId: 'motionpredict',
    storageBucket: 'motionpredict.appspot.com',
    messagingSenderId: '814888515758'
  };
  firebase.initializeApp(config);
  return firebase
    .database()
    .ref('data')
    .push().set;
};

export const saveToDB = initializeFirebase();

const mlUrl = 'http://35.170.11.37:300';

export const clearDb = () => {
  fetch(`${mlUrl} + /delete`, {
    method: 'POST'
  })
    .then(response => console.info(response))
    .catch(y => console.error('no good delete call', y));
};
export const getTraining = () => {
  fetch(`${mlUrl} + /train`, {
    method: 'GET'
  })
    .then(response => console.info(response))
    .catch(y => console.error('no good db call', y));
};
