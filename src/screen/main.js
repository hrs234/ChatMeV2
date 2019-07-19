import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { Container, Form, Item, Input, Label, Button, Content } from 'native-base';
import user from './User';
import firebase from 'firebase';

export default class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            phone: '',
            number: '',
            errorMessage: '',
            load: true,
            latitude: '',
            longitude: ''
        }

        this._getLocation();
    }

    // state = ({
        
    // })

    _getLocation = () =>
    {
        navigator.geolocation.getCurrentPosition(posistion => {
            this.setState({
                latitude: posistion.coords.latitude,
                longitude: posistion.coords.longitude,
                error: null,
                load: false
            })

            alert('Location Captured');

        }, error => this.setState({ error: error.message }),
            {
                enableHighAccuracy: true, timeout: 600000, maximumAge: 600000
            })
    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    // in here logics of logins starts
    submitLogin =  () => {
        if(this.state.phone == '')
        {
            alert('E-mail is Empty');
        }
        else if(this.state.name == '')
        {
            alert('password is Empty');
        }
        else
        {
            firebase.auth().signInWithEmailAndPassword(this.state.phone, this.state.number).then(({ user }) => {
                this._saveLogin(user.uid);
                
            }).catch(error => alert(error.message))
        }
    }

    updateLocation = (uid) => 
    {
            let updates = {};
            
            let containt = {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
            };

            updates['users/' + uid + '/location'] = containt;
            firebase.database().ref().update(updates).then( () => {
                alert('location updated');

                

            }).catch( error => {
                alert('failed updating location : \n Reason: '+error.message);
            });
    }

    _saveLogin =  (uid) => 
    {
        alert('Hello, ' + this.state.phone);

        this.updateLocation(uid);
        this._saveSession(uid);
        
        user.phone = uid;
        user.location.longitude = this.state.longitude;
        user.location.latitude = this.state.latitude;
        
        // firebase.database().ref("users/" + uid).set({ name: this.state.phone })
        
        this.props.navigation.navigate('App');
    }
    
    _saveSession = async (UID) =>
    {
        alert('saved in asyncstorage');

        await AsyncStorage.setItem('userPhone', UID);


        
    }

    render()
    {
        return (
            this.state.load 
            ?
                <ActivityIndicator style={{ marginTop: 150 }} />
            :
            <Fragment>
                <Container style={styles.container}>
                    <Text style={{ fontSize: 50, color: "#d4d6d9" }}>Login</Text>
                    <Image
                        source={require("../images/011-login.png")}
                        style={{ width: 150, height: 150, marginVertical: 25, marginHorizontal: 65 }}
                    />
                    <Form>
                        <Item floatingLabel style={{width: "75%"}}>
                            <Label>E-mail</Label>
                            <Input onChangeText={this.handleChange('phone')}/>
                        </Item>
                        <Item floatingLabel style={{ width: "75%", marginTop: 35 }}>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} onChangeText={this.handleChange('number')}/>
                        </Item>
                    </Form>
                    <Button style={{ marginTop: 35, width: 100, marginLeft: "50%", borderRadius: 15, backgroundColor: "#86A8E7" }} onPress={() => this.submitLogin()}><Text style={{  marginLeft: "35%", color: "#fff" }}> Login </Text></Button>
                    <TouchableOpacity style={{ marginTop: 40}} onPress={ () => this.props.navigation.navigate('Register') }>
                        <Text style={{ color: "#b0b0b0" }}>Not Have an account ?</Text>
                    </TouchableOpacity>
                </Container>
            </Fragment>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    contents:{
        alignSelf: "center",
        margin: "auto"
    },
    text: {
        width: "200"
    }
});

// const StackNavigator = createStackNavigator(
//     {
//         Drawer: DrawerNavigator,
//         Register: register
//     });

// const DrawerNavigator = createDrawerNavigator(
//   {
//     Main: App
//   });

// Main Screens for Drawer Navigator
// export const MainStack = createStackNavigator({
//     Dashboard: {
//         screen: Dashboard,
//         navigationOptions: {
//             title: 'main Menu',
//             gesturesEnabled: false,
//             headerLeft: null
//         }
//     }
//     // ,

//     // Register: {
//     //     screen: Register,
//     //     navigationOptions: {
//     //         title: 'Register'
//     //     }
//     // }
// }, { headerMode: 'screen' });

// Drawer Navigator      Stack => Drawer



// Main App Navigation
// const AppStack = createStackNavigator({
//     Login: {
//         screen: App,
//         navigationOptions: {
//             header: null,
//             gesturesEnabled: false
//         }
//     },

//     Drawer: {
//         screen: Drawer,
//         navigationOptions: {
//             header: null,
//             gesturesEnabled: false
//         }
//     }
// }, { headerMode: 'none' });

