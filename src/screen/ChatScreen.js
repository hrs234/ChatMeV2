import React, {Component} from 'react';
import {ActivityIndicator, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Dimensions, Image} from 'react-native';

import firebase from 'firebase';
import user from './User';

export default class ChatScreen extends Component
{
    // user.phone = uid

    constructor(props)
    {
        super(props);
        console.log("[CONSTRUCTOR]");
        console.log(props.navigation.getParam('phone'))
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                number: props.navigation.getParam('phone')
            },
            textMessage: '',
            messageList: [],
            loading: true
        }

        

    }

    // static navigationOptions = ({ navigation }) => {
    //     return{
    //         title: 'list Chats',
    //         headerRight: (
    //             <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    //                 <Image style={{ width: 32, height: 32, marginRight: 15 }} source={require('../images/maintain.jpg')} />
    //             </TouchableOpacity>)
    //     }
    // }

    

    static navigationOptions = ({ navigation }) => {
        
        
        
        return{
            title: navigation.getParam('name', null),
            
        }
    }


    
    

    componentDidMount()
    {
        firebase.database().ref("messages").child(user.phone).child(this.state.person.number).on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()],
                    loading: false
                }
            })

        })
    }
    
    

    

    // componentWillUpdate()
    // {
    //     this._loadChat();
    // }

    
    _handleChanges = key => value =>
    {
        this.setState({ [key]:value });
    }


    // logic of sending messages
    sendMessage = async () =>{
        if(this.state.textMessage.length > 0)
        {
            console.log("user.phone : " + user.phone);
            console.log("this.state.person.phone: " + JSON.stringify(this.state));

            let msgId = firebase.database().ref('messages').child(user.phone).child(this.state.person.number).push().key;
            
            let updates = {};
            
            let messages = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: user.phone
            };
            
            updates['messages/'+user.phone+'/'+this.state.person.number+'/'+msgId] = messages;
            updates['messages/' + this.state.person.number + '/' + user.phone + '/' + msgId] = messages;


            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
    }


    renderRow = ({item}) => {
        return(
            
            <View style={{ flexDirection: "row", width: '68%', padding: 10, alignSelf: item.from === user.phone ? 'flex-end' : 'flex-start', backgroundColor: item.from === user.phone ? "#81aef7" : "#cad5e8",borderBottomLeftRadius: 12,borderTopRightRadius: 12,marginBottom: 10}}>
                <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
                    {item.message}
                </Text>
                <Text style={{ color: "#000", padding: 3, fontSize: 12 }}>
                    {this.converTime(item.time)}
                </Text>
                
            </View>
        )
    }

    converTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

        if(c.getDay() !== d.getDay()){
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }

        return result;

    } 


    render()
    {
        let {height, width} = Dimensions.get('window');
        return(
            this.state.loading
            ?
            <ActivityIndicator style={{ marginTop: 250 }} />
            :
            <View style={{ flex: 1 }}>

                    
                <FlatList 
                data={this.state.messageList} 
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
                    style={{ padding: 10, height: height * 0.8, marginBottom: 15}} 
                    />
                    <SafeAreaView>
                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#a1c3ff" }}>
                        <TextInput onChangeText={this._handleChanges('textMessage')} style={{ width: "80%", padding: 13, backgroundColor: "#b8d1fc" }} placeholder="Type Message Here..." value={this.state.textMessage} />
                        <TouchableOpacity onPress={this.sendMessage}>
                            {/* <Text style={{ margin: 12 }}>Send</Text> */}
                            <Image source={require('../images/024-paperplane.png')} style={{ width: 30, height: 30, marginLeft: 20 }} />
                        </TouchableOpacity>
                    </View>        
                    </SafeAreaView>
            </View>
        )
    }
}