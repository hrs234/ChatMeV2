
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Button, Image, TouchableOpacity  } from 'react-native';
import { Container, Form, Item, Input, Label, Content } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Modal from "react-native-modal";



class Dashboard extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            longitude: 0,
            latitude: 0,
            error: null,
            markers: [{
                    title: 'Juan',
                    coordinates: {
                        latitude: 3.1495030,
                        longitude: 121.625649
                    }
                },
                {
                    title: 'sceps',
                    coordinates: {
                        latitude: 3.149771,
                        longitude: 101.655449
                    },  
                }],
            modalVisible: false,
            isOpen: false,
            isModalVisible: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3
        }
    }

    componentWillUpdate()
    {
        this._maps();
    }

    componentDidMount()
    {
        this._maps();
    }

    _maps = () =>{
        navigator.geolocation.getCurrentPosition(posistion => {
            this.setState({
                latitude: posistion.coords.latitude,
                longitude: posistion.coords.longitude,
                error: null
            })
        }, error => this.setState({ error: error.message }),
            {
                enableHighAccuracy: true, timeout: 600000, maximumAge: 600000
            })
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    
    render() {
        

        const pinColor = '#000000';

        return (
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
                        latitudeDelta: 1.1000,
                        longitudeDelta: 1.1000
                    }}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinates}
                            title={marker.title}
                        />
                    ))}
                    <Marker coordinate={this.state} pinColor={pinColor} title="You" onPress={this.toggleModal} />
                </MapView>

                {/* modal here */}
                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 1, backgroundColor: "#fff", height: 150, justifyContent: "center", flexDirection: "column" }}>
                            <Image source={{ uri: `https://avatars0.githubusercontent.com/u/38139389?v=4` }} style={{ width: 150, height: 150, borderRadius: 150, marginBottom: 15, marginTop: 25, alignSelf: "center" }} />
                            <Text style={{ textAlign: "center", marginTop: 25, marginBottom: 25, fontSize: 25 }}>Name Here</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 40 }}>
                                
                                <TouchableOpacity onPress={() => {alert('this chat')}}>
                                <Image source={require('../images/038-chat.png')} style={{ width: 50, height: 50, marginRight: 40 }} />
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => { alert('this profile') }}>
                                <Image source={require('../images/002-person.png')} style={{ width: 50, height: 50}} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={this.toggleModal}>
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
