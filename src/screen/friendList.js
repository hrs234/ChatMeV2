
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, RefreshControl, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Form, Item, Input, Label, Button, Content } from 'native-base';

class friendsList extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            data: [{
                id: '1',
                image: 'https://avatars0.githubusercontent.com/u/38139389?v=4',
                name: 'Dany'
            },
            {
                id: '2',
                image: 'https://avatars0.githubusercontent.com/u/35985089?v=4',
                name: 'Vin'
            },
            {
                id: '3',
                image: 'https://avatars2.githubusercontent.com/u/50226393?s=460&v=4',
                name: 'Yeos'
            },
            {
                id: '4',
                image: 'https://avatars0.githubusercontent.com/u/38139389?v=4',
                name: 'saints'
            },
                {
                    id: '5',
                    image: 'https://avatars0.githubusercontent.com/u/38139389?v=4',
                    name: 'Skip'
                },
                {
                    id: '6',
                    image: 'https://avatars0.githubusercontent.com/u/35985089?v=4',
                    name: 'Skille'
                },
                {
                    id: '7',
                    image: 'https://avatars2.githubusercontent.com/u/50226393?s=460&v=4',
                    name: 'Sketch'
                },
                {
                    id: '8',
                    image: 'https://avatars0.githubusercontent.com/u/38139389?v=4',
                    name: 'Brandon'
                }]
        }
    }

    getData = () =>{
        alert('This refreshed');
    }

    

    render() {
        return (
            <View style={{ backgroundColor: "#fff" }}>
                <Text style={{ marginTop: 20, marginLeft: 20, marginBottom: 15, fontSize: 50, color: "#d4d6d9" }} >Friends</Text>
                    <FlatList 
                    
                    data={this.state.data}
                    keyExtractor={this.state.data.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.getData()}
                        />}
                    renderItem={
                        ({item}) => (
                                <TouchableOpacity activeOpacity={0.8}>

                                <View 
                                style={{ backgroundColor: "#fff", borderBottomColor: "#fff", borderTopColor: "#fff",  padding: 20, borderWidth: 0.5, flexDirection: "row"}}
                                >
                                    <Image
                                        style={{ borderRadius: 150, width: 50, height: 50, marginRight: 23 }}
                                        source={{ uri: `${item.image}` }}
                                    />
            
                                    <View 
                                    style={{ flexDirection: "column" }}
                                    >
                                        <Text style={{ marginTop: 16, fontSize: 20, color: "#b0aeae"}}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </View>
                                </TouchableOpacity>
                        )
                    }
                    />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        // position: "absolute",
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        width: "100%",
        height: 15,
        marginTop: -900,
        // marginVertical: 30
        fontSize: 50, color: "#d4d6d9", marginLeft: 25, marginTop: 300, position: "absolute"
    },
    contents: {
        alignSelf: "center",
        margin: "auto"
    },
    text: {
        width: "200"
    }
});

export default friendsList;
