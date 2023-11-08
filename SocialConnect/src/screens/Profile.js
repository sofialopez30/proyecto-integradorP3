import React, { Component } from 'react'
import {Text, View, TouchableOpacity} from 'react-native'

import { auth } from '../firebase/config'

import FormProfile from '../components/FormProfile'

export default class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(auth.currentUser);
  }

  logOut() {
    auth.signOut()
    .then(() => {
      this.props.navigation.navigate("Login")
    })
  }

  render() {
    return (
      <View>
        <Text>Profile </Text>
        <TouchableOpacity onPress={() => this.logOut()}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <FormProfile userEmail={auth.currentUser.email} navigation={this.props.navigation} />
      </View>
    )
  }
}
