
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Modal, TouchableHighlight } from 'react-native';
import { Container, Form, Item, Input, Label, Button, Content } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';

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

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    _Modal = () => {
        
    }
    
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
                    <Marker coordinate={this.state} pinColor={pinColor} title="You" onPress={() => this.setModalVisible(true)} />
                </MapView>

                {/* modal here */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View style={{ display: "flex", justifyContent: "center", flex: 1 }}>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

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

export default Dashboard;
