import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { auth, db } from '../firebase/config'

import Posteo from "./Posteo";
import ControlesPosteo from './ControlesPosteo';

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
    }

    getPosteosByEmail(userEmail) {
        db.collection("posts").onSnapshot((querySnapshot) => {
            const arrayPosteos = []
            querySnapshot.forEach((doc) => {
                if (doc.data().owner == userEmail) {
                    arrayPosteos.push({
                        data: doc.data(),
                        uid: doc.id
                    })
                }
            });
            arrayPosteos.sort((a, b) => b.data.createdAt - a.data.createdAt);
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
            arrayPosteos.sort((a, b) => b.data.createdAt - a.data.createdAt);
            this.setState({
                arrayPosteos: arrayPosteos
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.arrayPosteos ?
                        this.state.arrayPosteos.length > 0 ?
                            this.props.userEmail === auth.currentUser.email ?
                                <FlatList
                                    data={this.state.arrayPosteos}
                                    renderItem={({ item }) => {
                                        <React.Fragment>
                                            <ControlesPosteo posteoId={item.uid} navigation={this.props.navigation} />
                                            <Posteo posteo={item} navigation={this.props.navigation} />
                                        </React.Fragment>
                                    }}
                                    keyExtractor={item => item.createdAt?.toString()}
                                    contentContainerStyle={styles.postContainer}
                                /> :
                                <FlatList
                                    data={this.state.arrayPosteos}
                                    renderItem={({ item }) => <Posteo posteo={item} navigation={this.props.navigation} />}
                                    keyExtractor={item => item.createdAt?.toString()}
                                    contentContainerStyle={styles.postContainer}
                                /> :
                            <Text>No hay posteos</Text> :
                        <Text>No hay posteos</Text>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
    },
    postContainer: {
        alignItems: 'center',
        paddingTop: 10,
    },

});

export default PosteosContainer