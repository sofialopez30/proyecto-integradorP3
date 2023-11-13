import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import { db } from '../firebase/config'

import FormProfile from '../components/FormProfile'

export default class StackProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            userEmail: null
        }
    }

    componentDidMount() {
        console.log(this.props.route.params.userName);
        
        db.collection("users").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().userName == this.props.route.params.userName) {
                    console.log("YES");
                    this.setState({
                        userEmail: doc.data().owner
                    })
                }
            });
        });
    }

    render() {
        return (
            <View style= {styles.container}>
                {/* <Text> StackPorfile </Text> */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                    <Text style={styles.title} >&larr;</Text>
                </TouchableOpacity>
                {
                    this.state.userEmail ?
                    <FormProfile userEmail={this.state.userEmail}/> :
                    null
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      padding: 20,
      backgroundColor: '#282c34', 
    },
    title: {
      fontSize: 25,
      color: '#61dafb',
     },
  });