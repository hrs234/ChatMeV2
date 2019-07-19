
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Button, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Container, Form, Item, Input, Label, Content } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Modal from "react-native-modal";
import User from '../screen/User';
import firebase from '../config/firebase';

class Dashboard extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            longitude: 0,
            latitude: 0,
            error: null,
            modalVisible: false,
            isOpen: false,
            isModalVisible: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3,
            process: true,
            users: [],
            currentClick: []
        }
        // this._maps();
    }

    

    componentWillMount() 
    {
        firebase.database().ref('users').on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;
            if (person.phone === User.phone) {

                // this is your personal info
                User.location = {
                    latitude: person.location.latitude,
                    longitude: person.location.longitude
                }
            }
            else {
                // inserting to the state as other user
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }

    


    
    
    componentDidMount() 
    {

        // this._getData();

        StatusBar.setHidden(false)
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        process: false
                })
            }, (error) => console.warn(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        )
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                   
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        
                    
                })
            }
        )
    }
    

    toggleModal = (data, option) => {
        
        if(option == true)
        {
            this.setState({ isModalVisible: true, currentClick: data });

            

            console.warn("[GETTTED]"+JSON.stringify(data));
        }
        else
        {
            this.setState({ isModalVisible: false });
        }
        
    };
    
    render() {
        
        console.warn(this.state.users);


        return (
            this.state.process
            ?
                <ActivityIndicator style={{ marginTop: 150 }} />
            :
            <Fragment>
                {/* <Container style={styles.container}>
                    <Text style={{ fontSize: 50, color: "#d4d6d9" }}>Maps</Text>
                </Container> */}



                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.1000,
                        longitudeDelta: 0.1000
                    }}
                    showsUserLocation={true}
                >
                        {
                            this.state.users.map(data => (
                                <MapView.Marker
                                    coordinate={
                                        {
                                            latitude: data.location.latitude,
                                            longitude: data.location.longitude,
                                            latitudeDelta: 0.0043,
                                            longitudeDelta: 0.0034
                                        }
                                    }
                                    onPress={() => {this.toggleModal(data, true)}}
                                    title={data.name}>
                                </MapView.Marker>
                            ))
                        }
                    {/* <Marker coordinate={this.state} pinColor={pinColor} title="You" onPress={this.toggleModal} /> */}
                </MapView>

                {/* modal here */}
                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 1, backgroundColor: "#fff", height: 150, justifyContent: "center", flexDirection: "column" }}>
                            <Image source={{ uri: `https://avatars0.githubusercontent.com/u/38139389?v=4` }} style={{ width: 150, height: 150, borderRadius: 150, marginBottom: 15, marginTop: 25, alignSelf: "center" }} />
                            <Text style={{ textAlign: "center", marginTop: 25, marginBottom: 25, fontSize: 25 }}>{this.state.currentClick.name}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 40 }}>
                                
                                <TouchableOpacity onPress={() => {alert('this chat')}}>
                                <Image source={require('../images/038-chat.png')} style={{ width: 50, height: 50, marginRight: 40 }} />
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => { alert('this profile') }}>
                                <Image source={require('../images/002-person.png')} style={{ width: 50, height: 50}} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.toggleModal(null ,false)}>
                                <Text style={{ color: "#ff9696", textAlign: "center"}} >Close</Text>
                            </TouchableOpacity>

                            {/* <Button title="Close" onPress={this.toggleModal} style={{ width: 150 }} /> */}
                            
                        </View>
                    </Modal>
                </View>

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
    },
   
});

export default Dashboard;
