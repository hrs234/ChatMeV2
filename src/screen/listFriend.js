
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, AsyncStorage, Alert, FlatList, SafeAreaView } from 'react-native';
import {  Form, Item, Input, Label, Button, Content, Container} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
// import data from user logins
import user from './User';


class App extends Component {

    // static navigationOptions = ({ navigation }) => {
    //     return{
    //         title: 'list Chats',
    //         headerRight: (
    //             <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    //                 <Image style={{ width: 32, height: 32, marginRight: 15 }} source={require('../images/maintain.jpg')} />
    //             </TouchableOpacity>)
    //     }
    // }

    

    state = {
        users: []
    }

    componentWillMount()
    {
        let dbRef = firebase.database().ref('users');

        dbRef.on("child_added", (val)=>{
            let person = val.val();
            
            // console.warn("[PERSON chat.js] Email: "+JSON.stringify(person.email));
            // console.log("[PERSON chat.js] img: "+JSON.stringify(person.img));

            // definite new key
            person.phone = val.key;


            if(person.phone === user.phone)
            {

                console.warn(person.name);

                user.number = person.number;
                user.name = person.name;
                user.email = person.email;
            }
            else
            {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }

        })
    }

//     <TouchableOpacity activeOpacity={0.8}>

//     <View
//         style={{ backgroundColor: "#fff", borderBottomColor: "#fff", borderTopColor: "#fff", padding: 20, borderWidth: 0.5, flexDirection: "row" }}
//     >
//         <Image
//             style={{ borderRadius: 150, width: 50, height: 50, marginRight: 23 }}
//             source={{ uri: `${item.image}` }}
//         />

//         <View
//             style={{ flexDirection: "column" }}
//         >
//             <Text style={{ marginTop: 16, fontSize: 20, color: "#b0aeae" }}>
//                 {item.name}
//             </Text>
//         </View>
//     </View>
// </TouchableOpacity>

    renderRow = ({ item }) =>{
        return(
            <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.navigate('FriendProfile', item)}>
                <View style={{ backgroundColor: "#fff", borderBottomColor: "#fff", borderTopColor: "#fff", padding: 15, borderWidth: 0, flexDirection: "row" }}>
                    <Image
                    style={{ width: 50, height: 50, marginRight: 23 }}
                    source={require('../images/005-contact.png')}
                    />
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ marginTop: 16, fontSize: 20, color: "#b0aeae" }}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Fragment>
                <View style={{ backgroundColor: "#fff" }}>
                    <Text style={{ marginTop: 20, marginLeft: 20, marginBottom: 15, fontSize: 50, color: "#d4d6d9" }} >Friends</Text>
                    {/* <SafeAreaView> */}
                        <FlatList 
                        data={this.state.users}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => item.phone}
                        />
                    {/* </SafeAreaView> */}
                </View>
                {/* <Container style={styles.container}> */}
                    {/* <Text style={{ fontSize: 50, color: "#d4d6d9", marginBottom: 30 }}>Your Username: {user.phone}</Text>
                     <TouchableOpacity onPress={() => this._logout()}>
                    <Text style={{ fontSize: 25, color: "#ebbcb5", marginBottom: 30 }}>Logout</Text>
                </TouchableOpacity>
                     */}

                
                

                {/* </Container> */}
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

export default App;
