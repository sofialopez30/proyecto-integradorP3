import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { db } from '../firebase/config'

import PosteosContainer from './PosteosContainer';
import ControlesPosteo from './ControlesPosteo';

class FormProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayPosteos: [],
            userData: null
        }
    }

    componentDidMount() {
        console.log(this.props.userEmail)
        this.getUserData(this.props.userEmail)
        this.getPosteos(this.props.userEmail)
    }
    
    getUserData(userEmail) {
        db.collection("users").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().owner == userEmail) {
                    this.setState({
                        userData: doc.data()
                    })
                }
            });
        });
    }

    getPosteos(userEmail) {
        db.collection("posts").onSnapshot((querySnapshot) => {
            const arrayPosteos = []
            querySnapshot.forEach((doc) => {
                if (doc.data().userEmail == userEmail) {
                    arrayPosteos.push({
                        data: doc.data(),
                        uid: doc.id
                    })
                }
            });
            this.setState({
                arrayPosteos: arrayPosteos
            })
        });
    }

    render() {
        return (
            <View>
                <Text> FormProfile </Text>
                <Text>{this.props.userEmail}</Text>
                {
                    this.state.userData ?
                    <View>
                        <Text>Nombre de ususario: {this.state.userData.userName}</Text>
                        <Text>Biografía: {this.state.userData.bio}</Text>
                        <Text>Foto de perfil: {this.state.userData.fotoPerfil}</Text>
                        <Text>Posteos: {this.state.arrayPosteos.length}</Text>
                    </View> :
                    null
                }
                {
                    this.state.arrayPosteos ?
                    <FlatList
                        data={this.state.arrayPosteos}
                        renderItem={({ item }) => 
                            <View>
                                <ControlesPosteo posteoId={item.uid} navigation={this.props.navigation} />
                                <PosteosContainer posteo={item} navigation={this.props.navigation} /> 
                            </View>
                        }
                        keyExtractor={item => item.uid}
                    /> :
                    <Text>No hay posteos para mostrar</Text>
                }
            </View>
        )
    }
}

export default FormProfile