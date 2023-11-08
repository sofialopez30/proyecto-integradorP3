import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { db } from '../firebase/config'

import FormProfile from '../components/FormProfile'

export default class StackPorfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            <View>
                <Text> StackPorfile </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                    <Text>&larr;</Text>
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