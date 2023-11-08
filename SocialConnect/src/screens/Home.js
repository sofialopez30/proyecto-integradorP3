import React, { Component } from 'react'
import {Text, View} from 'react-native'

import PosteosContainer from '../components/PosteosContainer'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
        <PosteosContainer navigation={this.props.navigation} />
      </View>
    )
  }
}
