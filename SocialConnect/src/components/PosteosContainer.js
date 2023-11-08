import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { db } from '../firebase/config'

import Posteo from "./Posteo"

class PosteosContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayPosteos: []
        }
    }

    componentDidMount() {
        if (this.props.userEmail) {
            this.getPosteosByEmail(this.props.userEmail)
        } else {
            this.getPosteos()
        }
        console.log(this.props);
        console.log(this.props.navigation);
    }

    getPosteosByEmail(userEmail) {
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

    getPosteos() {
        db.collection("posts").onSnapshot((querySnapshot) => {
            const arrayPosteos = []
            querySnapshot.forEach((doc) => {
                arrayPosteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            this.setState({
                arrayPosteos: arrayPosteos
            })
        });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.arrayPosteos}
                    renderItem={({ item }) => <Posteo posteo={item} navigation={this.props.navigation} />}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}

export default PosteosContainer