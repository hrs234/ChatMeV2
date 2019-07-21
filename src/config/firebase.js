import firebase from 'firebase';

const config = {

    apiKey: "YOUR_API_KEYS",
    authDomain: "YOUR_DOMAINS",
    databaseURL: "YOUR_DATABASE_URLs",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"

    
}

const Firebase = firebase.initializeApp(config);

export default Firebase;