
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { Container, Form, Item, Input, Label, Button, Content } from 'native-base';
import firebase from '../config/firebase';
import user from '../screen/User';

class menu extends Component {

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


            if (person.phone === user.phone) {

                console.warn(person.name);

                user.number = person.number;
                user.name = person.name;
                user.email = person.email;
            }


        })
    }

    render() {
        return (
            <Fragment>
                
                <Container style={styles.container}>
                    {/* <TouchableHighlight onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{ fontSize: 50, color: "#d4d6d9" }}>Register</Text>
                    </TouchableHighlight> */}
                        <Image source={require('../images/035-location.png')} style={{ marginBottom: 17, width: 80, height: 80, marginLeft: 10, marginTop: 20 }} />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                            <Text style={{ fontSize: 50, color: "#d4d6d9", marginBottom: 50 }}>Maps</Text>
                        </TouchableOpacity>
                    
                        <Image source={require('../images/038-chat.png')} style={{ marginBottom: 17, width: 80, height: 80, marginLeft: 10 }} />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListChat')}>
                        <Text style={{ fontSize: 50, color: "#d4d6d9", marginBottom: 50 }}>Chats</Text>
                        </TouchableOpacity>

                        <Image source={require('../images/003-person.png')} style={{ marginBottom: 17, width: 80, height: 80, marginLeft: 10 }} />
                        <TouchableOpacity>
                        <Text style={{ fontSize: 50, color: "#d4d6d9", marginBottom: 50 }} onPress={() => this.props.navigation.navigate('Profile')}>Profile</Text>
                        </TouchableOpacity>
                    

                </Container>
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
        margin: "auto"
    },
    text: {
        width: "200"
    }
});

export default menu;
