
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Form, Item, Input, Label, Button, Content } from 'native-base';
import firebase from '../config/firebase';
import user from '../screen/User';

class menu extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loading: true
        }
    }

    _logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    componentDidMount()
    {
        this._getData();
    }

    componentWillUpdate()
    {
        this._getData();
    }

    _getData = () =>
    {
        let dbRef = firebase.database().ref('users');

        dbRef.on("child_added", (val) => {
            let person = val.val();


            // definite new key
            person.phone = val.key;


            if (person.phone === user.phone) 
            {

                console.warn(person.name);

                user.number = person.number;
                user.name = person.name;
                user.email = person.email;
                user.img = person.img;
                

            }


        })
    }

    render() {
        return (

            
            <Fragment>
                
                <Text style={{ fontSize: 50, marginLeft: 30, marginTop: 30, color: "#d4d6d9" }}>ChatMe</Text>

                <View style={styles.container}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                    <Image source={require('../images/035-location.png')} style={{  width: 50, height: 50, padding: 20, margin: 30, alignContent: "center"}} />
                    <Text style={{ fontSize: 25, color: "#d4d6d9", textAlign: "center" }}>Maps</Text>
                    </TouchableOpacity>
                        
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ListChat')}>
                    <Image source={require('../images/038-chat.png')} style={{  width: 50, height: 50, padding: 20, margin: 30, alignContent: "center" }} />
                    <Text style={{ fontSize: 25, color: "#d4d6d9", textAlign: "center" }}>Chats</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                    <Image source={require('../images/003-person.png')} style={{  width: 50, height: 50, padding: 20, margin: 30, alignContent: "center"}} />
                    <Text style={{ fontSize: 25, color: "#d4d6d9", textAlign: "center" }} >MyProfile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ListFriend')}>
                    <Image source={require('../images/007-group.png')} style={{  width: 50, height: 50, padding: 20, margin: 30, alignContent: "center"}} />
                    <Text style={{ fontSize: 25, color: "#d4d6d9", textAlign: "center" }} >Friends</Text>
                    </TouchableOpacity>
                    

                </View>
            </Fragment>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: "wrap",
        padding: 15
    },
    contents: {
        alignSelf: "center",
        margin: "auto"
    },
    text: {
        width: "200"
    }
});

export default menu;
