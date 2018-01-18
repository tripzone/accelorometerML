import * as firebase from 'firebase';

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
  const database = firebase.database().ref('data');
  return {
    save: data => database.push().set(data),
    drop: () => {
      database.remove();
    },
  };
};

const fb = initializeFirebase();

export const { save, drop } = fb;

const mlUrl = 'http://35.170.11.37:300';

export const clearDb = () => {
  fetch(`${mlUrl} + /delete`, {
    method: 'POST',
  })
    .then(response => console.info(response))
    .catch(y => console.error('no good delete call', y));
};
export const getTraining = () => {
  fetch(`${mlUrl} + /train`, {
    method: 'GET',
  })
    .then(response => console.info(response))
    .catch(y => console.error('no good db call', y));
};
