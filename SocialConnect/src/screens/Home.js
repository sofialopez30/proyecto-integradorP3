import React, { Component } from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { auth } from '../firebase/config'

import PosteosContainer from '../components/PosteosContainer'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        this.props.navigation.navigate('TabNavigation')
      }
    })
  }

  render() {
    return (
      <View style= {styles.container}>
        <Text style= { styles.title}>Home</Text>
        <PosteosContainer style={styles.comp} navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34', 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    marginLeft: 150, 
    color: '#61dafb',
   },
  comp:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40, 
  }
})
