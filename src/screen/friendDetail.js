
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
// import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../config/firebase';

import user from '../screen/User';


class App extends Component {
    // state = {
    //     name: user.phone
    // }

    
    constructor(props)
    {
        super(props);
        this.state = {
            dataProfile: []
        }
    }


    componentWillMount()
    {
        // let dbRef = firebase.database().ref('users/'+user.phone);

        // console.log(dbRef);

        // dbRef.on("child_added", (val) => {
        //     // let person = val.val();

        //     let person = val;

        //     // person.email = val.key;
        //     // person.img = val.

        //     console.log("[PERSON friendDetail.js] : " + JSON.stringify(person));

        // })

        

        let dbRef = firebase.database().ref('users').child(user.phone).child('email');

        console.log(dbRef);

        // dbRef.on("child_added", (snapshot) => {
        //     let data = snapshot.val();

        //     console.log("Data email: "+ data.email);
        // })

        // console.log(dbRef);

        // dbRef.on("child_added", (val) => {
        //     let person = val.val();

        //     console.log("[PERSON friendDetail.js] : " + JSON.stringify(person));

        //     this.setState({ person });
            

        // })
    }

    // clear the async storage

    _logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    render() {
        console.log("[DATA friendDetail.js] : "+JSON.stringify(this.state));
        return (
            <Fragment >

                <Content >
                    <View style={styles.container}>

                            <Image style={{ width: "100%", height: 250 }} source={require("../images/bg.jpg")} />
                            <Image
                                    source={{ uri: `${user.img}` }}
                                    style={{ width: 150, height: 150, borderRadius: 150, marginTop: -90}}
                                />
                        <ScrollView>
                            <Text style={{ marginTop: 40, fontWeight: "bold", fontSize: 25, textAlign: "center" }}>{user.name}</Text>
                            <Text style={{ marginTop: 25, fontSize: 19, textAlign: "center" }}>{user.email}</Text>

                            <TouchableOpacity onPress={() => this._logout()}>
                                <Text style={{ marginTop: 40, textAlign: "center", fontSize: 20 }}>Logout</Text>
                            </TouchableOpacity>

                        </ScrollView>



                        
                    </View>
                </Content>
            </Fragment>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    contents: {
        alignSelf: "center",
        margin: "auto",
    },
    text: {
        width: "200"
    }
});

export default App;
