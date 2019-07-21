<div align=center>
    <h1>ChatMe</h1>
    <img src="src/images/037-chat.png" alt="X" width="150">
</div>



## Description

ChatMe is Chatting application with maps to track our friends where is located

## Features

<img src="src/images/038-chat.png" alt="X" width="80" />Chatting



<img src="src/images/035-location.png" width="80">TrackFriends (beta)

## Preview

## Installation

  - ## Development
  
    - install this requirements first
  
        - Node.js
        - React Native (cli version)
  
    - then setup our API key

        - ## Firebase

            - first open in `src/config/Firebase.js`
            - then open and edit the file with your favorite and here the file structure
            ```
                import firebase from 'firebase';

                const config = {

                apiKey:"YOUR_API_KEYS",
                authDomain: "YOUR_DOMAINS",
                databaseURL: "YOUR_DATABASE_URLs",
                projectId: "YOUR_PROJECT_ID",
                storageBucket: "",
                messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
                appId: "YOUR_APP_ID"

            }

            const Firebase = firebase.initializeApp(config);

            export default Firebase;
            ```
        
        - ## Google Maps
        
            - open the `manifest.xml` in `android\app\src\main\AndroidManifest.xml` and edit it. Here the stucture files 

            ```
            <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_API_KEY"/>
            </application>
            ```
            <small>NOTES: only edit the YOUR_API_KEY</small>
  
  - ## Release

    - make sure your devices is Android  
    - Open settings in your phone
    - find the settings in your phone named `install unknown apps` and allow it
    - download the application here
    - open in your downloads folder of your phone named `ChatMe-beta.apk` and touch it
    - touch `install` and wait until done
    - voila! the application installed

    <small>NOTES:  If you have prompted google play protect during installation process touch the `install anyway`</small>
## Resource

- <div>Icons made by <a href="https://www.freepik.com/?__hstc=57440181.0f99c0d8527866a47e1ccd8edf6983aa.1563453172319.1563453172319.1563453172319.1&__hssc=57440181.4.1563453172320&__hsfp=3453667035" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>