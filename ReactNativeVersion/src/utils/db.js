import * as firebase from 'firebase';
import axios from 'axios';

const initializeFirebase = () => {
  const config = {
    apiKey: 'AIzaSyDL8g0u9reKJnR1nj96Z9-4HkIIXYhMt4I',
    authDomain: 'motionpredict.firebaseapp.com',
    databaseURL: 'https://motionpredict.firebaseio.com',
    projectId: 'motionpredict',
    storageBucket: 'motionpredict.appspot.com',
    messagingSenderId: '814888515758',
  };
  firebase.initializeApp(config);
  return {
    save: (data, target) =>
      firebase
        .database()
        .ref(target)
        .push()
        .set(data),
    drop: target => {
      firebase
        .database()
        .ref(target)
        .remove();
    },
  };
};

const fb = initializeFirebase();

export const { save, drop } = fb;

const mlUrl = 'http://35.170.11.37:300';
// const mlUrl = 'http://192.168.7.238:600';

export const trainModel2 = () => {
  fetch(`${mlUrl} + /train`, {
    method: 'GET',
  })
    .then(response => console.info(response))
    .catch(y => console.error('no good db call', y));
};

export const trainModel = () => {
  axios
    .get(`${mlUrl}/train`)
    .then(console.log)
    .catch(console.error);
};

export const predictModel = (data, onChange) => {
  axios
    .post(`${mlUrl}/predict`, data)
    .then(response => onChange(response.data.result))
    .then(console.log)
    .catch(console.error);
};
