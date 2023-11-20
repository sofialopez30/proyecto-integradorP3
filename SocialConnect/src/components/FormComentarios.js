import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

export default class FormComentarios extends Component {
    constructor(props){
        super(props)
        this.state = {
            comentario: '',
        }
    }

    comentar(comentario){
        db.collection('posts').doc(this.props.postId).update({
          comentarios: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            comentario: comentario
          })
        }),
        this.setState({ comentario: '' });
      }
      
      render() {
        return (
          <View style={styles.container}>

            <TextInput
              placeholder='Agrega un comentario'
              keyboardType='default'
              onChangeText={(text) => this.setState({comentario: text})}
              value={this.state.comentario}
              multiline={true}
              numberOfLines={4}
              style={styles.input}
            />

            <View style={styles.buttonContainer}>

              {!this.state.comentario ? (
                <TouchableOpacity style={[styles.button, styles.buttonDisabled]} onPress={() => alert("Debe escribir un comentario")}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[styles.button, styles.buttonEnabled]} onPress={() => this.comentar(this.state.comentario)}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      }
     
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  buttonEnabled: {
    backgroundColor: '#61dafb',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});