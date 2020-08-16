import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBAenYh1eAJSB_-U4O4gd1pY1Y9Yde2UnI",
    authDomain: "platso-73af9.firebaseapp.com",
    databaseURL: "https://platso-73af9.firebaseio.com",
    projectId: "platso-73af9",
    storageBucket: "platso-73af9.appspot.com",
    messagingSenderId: "136650171019",
    appId: "1:136650171019:web:a7e2e91ec27308f037aa8e",
    measurementId: "G-16B5JR2395"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;