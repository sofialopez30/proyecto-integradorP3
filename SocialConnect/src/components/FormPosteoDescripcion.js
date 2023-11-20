import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'


export default class FormPosteoDescripcion extends Component {
    constructor(props){
        super(props)
        this.state ={
            descripcionPost : ''
        }
    }
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Describe tu post</Text>
          <View style={styles.inputContainer}>

            <TextInput
              placeholder='Añade aquí la descripción de tu post'
              onChangeText={(descripcion) => this.props.actualizarDescripcion(descripcion)}
              value={this.props.estadoDescripcion}
              multiline={true}
              numberOfLines={8}
              style={styles.input}
              
            />
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      backgroundColor: '#282c34', 
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'white'
    },
    inputContainer: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    input: {
      fontSize: 16,
      textAlignVertical: 'top',
      color: 'white'
    },
  });