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
// import { TouchableOpacity } from 'react-native-gesture-handler';

// export const Switch = createStackNavigator({
//     Login: {
//         screen: App,
//         navigationOptions: { header: null }
//     },
//     menu: {
//         screen: menu,
//         navigationOptions: { header: null }
//     },
//     Register: {
//         screen: Register,
//         navigationOptions: { header: null }
//     },
//     Dashboard: {
//         screen: Dashboard,
//         navigationOptions: { header: null }
//     },
//     Friends: {
//         screen: friendList,
//         navigationOptions: { header: null }
//     },
//     detailsFriend: {
//         screen: friendDetail,
//         navigationOptions: { header: null }

//     },
//     Chat: {
//         screen: chat,
//         navigationOptions: { header: null }
//     }
// });

// const Login = createStackNavigator({ Login: App });
// const Menu = createStackNavigator({ Login: menu });
// const regist = createStackNavigator({ Login: Register });
// const dash = createStackNavigator({ Login: Dashboard });
// const Friends = createStackNavigator({ Friends: friendList });
// const Chat = createStackNavigator({ Chat: chat });


// export default createAppContainer(createSwitchNavigator(
// {
//     Login: Login,
//     Menu: Menu,
//     Register: regist,
//     Dashboard: dash,
//     Friends: Friends,
//     Chat: Chat
// },
// {
//     initialRouteName: 'Login'
// }));



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
            screen: chat
        },
        Profile: {
            screen: friendDetail,
            navigationOptions: {
                header: null
            }
        },
        Chat: {
            screen: ChatScreen
            
        },
        
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
