import firebase from 'firebase';

const config = {

    apiKey: "AIzaSyB1Mf_zMhS8ElEWZs4k8mTMiNihwGo0ul8",
    authDomain: "chatme-ef3cd.firebaseapp.com",
    databaseURL: "https://chatme-ef3cd.firebaseio.com",
    projectId: "chatme-ef3cd",
    storageBucket: "",
    messagingSenderId: "238480690388",
    appId: "1:238480690388:web:6491887ed1baed71"

}

const Firebase = firebase.initializeApp(config);

export default Firebase;