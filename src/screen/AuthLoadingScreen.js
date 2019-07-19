import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

// firebase
// import firebase from 'firebase';

// get the global state its containt usernames
import user from './User';

import Firebase from '../config/firebase';


export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);

        // trigger the function (this trigger active after opens the apps)
        this._bootstrapAsync();
    }

    componentWillMount()
    {
        // Your web app's Firebase configuration
        // var firebaseConfig = {
        //     apiKey: "AIzaSyB1Mf_zMhS8ElEWZs4k8mTMiNihwGo0ul8",
        //     authDomain: "chatme-ef3cd.firebaseapp.com",
        //     databaseURL: "https://chatme-ef3cd.firebaseio.com",
        //     projectId: "chatme-ef3cd",
        //     storageBucket: "",
        //     messagingSenderId: "238480690388",
        //     appId: "1:238480690388:web:6491887ed1baed71"
        // };
        // // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);

        // firebase();

    }

    // Fetch user from asyncStorage
    _bootstrapAsync = async () => {

        // getting username information and add it to the global objects in user.js file
        user.phone = await AsyncStorage.getItem('userPhone');

        // navigate is user have login before ?
        this.props.navigation.navigate(user.phone ? 'App' : 'Auth');
    };

    // Loading screen
    render() {
        return (
            <View>
                <ActivityIndicator style={{ marginTop: 150 }}/>
                <StatusBar barStyle="default" />
            </View>
        );
    }
}