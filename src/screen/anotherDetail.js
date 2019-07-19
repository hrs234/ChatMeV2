
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
// import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../config/firebase';

import user from './User';


class App extends Component {
    // state = {
    //     name: user.phone
    // }

    
    constructor(props)
    {
        super(props);
        this.state = {
            dataProfile: {
                name: props.navigation.getParam('name'),
                number: props.navigation.getParam('phone')
            }
        }
    }

    myData = {
        email: '',
        name: ''
    }


    componentWillMount()
    {

        let dbRef = firebase.database().ref('users');

        dbRef.on("child_added", (val) => {
            let person = val.val();


            // definite new key
            person.phone = val.key;


            if (person.phone === this.state.dataProfile.number) {

                // console.warn(person.name);

                // user.number = person.number;
                // user.name = person.name;
                // user.email = person.email;
                
                this.myData.email = person.email;
                this.myData.name = person.name;

            }


        })
    }

    // clear the async storage

    
    render() {
        console.log("[DATA friendDetail.js] : "+JSON.stringify(this.state));
        return (
            <Fragment >

                <Content >
                    <View style={styles.container}>

                            <Image style={{ width: "100%", height: 250 }} source={require("../images/bg.jpg")} />
                            <Image
                                    source={{ uri: `https://avatars0.githubusercontent.com/u/38139389?v=4` }}
                                    style={{ width: 150, height: 150, borderRadius: 150, marginTop: -90}}
                                />
                        <ScrollView>
                            <Text style={{ marginTop: 40, fontWeight: "bold", fontSize: 25, textAlign: "center" }}>{this.myData.name}</Text>
                            <Text style={{ marginTop: 25, fontSize: 19, textAlign: "center" }}>{this.myData.email}</Text>

                            

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
