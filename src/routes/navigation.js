import React, {Component} from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {TouchableOpacity, Image} from 'react-native';

import Register from '../screen/register';
import Dashboard from '../screen/Dashboard';
import friendList from '../screen/friendList';
import friendDetail from '../screen/friendDetail';
import chat from '../screen/chat';
import App from '../screen/main';
import menu from '../screen/menu';
import AuthLoading from '../screen/AuthLoadingScreen';
import ChatScreen from '../screen/ChatScreen';
import anotherDetail from '../screen/anotherDetail';
import listFriend from '../screen/listFriend';


// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator(
    { 
        Home: {
            screen: menu,
            navigationOptions: {
                header: null
            }
        },
        Maps: {
            screen: Dashboard,
            navigationOptions: {
                header: null
            }
        },
        ListChat: {
            screen: chat,
            navigationOptions: {
                header: null
            }
        },
        Profile: {
            screen: friendDetail,
            navigationOptions: {
                header: null
            }
        },
        Chat: {
            screen: ChatScreen,
            
            
        },
        FriendProfile: {
            screen: anotherDetail,
            navigationOptions: {
                header: null
            }
        },
        ListFriend:{
            screen: listFriend,
            navigationOptions: {
                header: null
            }
        }
        
    });
const AuthStack = createStackNavigator(
    { 
        SignIn: { 
            screen: App,
            navigationOptions: {
                header: null
            }
        } 
    });

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App:{ 
            screen: AppStack, 
        },
        Auth: AuthStack,
        Register: {
            screen: Register
        } 
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
