importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');

  firebase.initializeApp({
    apiKey: 'AIzaSyDsxSI3YOq2kymaAyRpLsxcIMQabtZEk6w',
    authDomain: 'apptuu-29808.firebaseapp.com',
    databaseURL: 'https://apptuu-29808.firebaseio.com',
    projectId: 'apptuu-29808',
    storageBucket: 'apptuu-29808.appspot.com',
    messagingSenderId: '964121176109',
    appId: '1:964121176109:web:fdab8b70a03b1c483970a4',
    measurementId: 'G-5B73WQ3F8H'
});
  const messaging = firebase.messaging();