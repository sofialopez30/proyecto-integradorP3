import React, { Component } from 'react'
import {Text, View} from 'react-native'
import {auth} from '../firebase/config'

export default class Comentarios extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <Text> Comentarios</Text>
    )
  }
}
