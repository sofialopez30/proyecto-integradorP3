import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { auth, db } from '../firebase/config'
import FormPosteo from '../components/FormPosteo'
import FormPosteoDescripcion from '../components/FormPosteoDescripcion'

export default class Posteo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      descripcion: '',
      urlFoto: '',
      paso1: true
    }
  }

  cargarDesdeURL = () => {
    const urlFoto = this.state.urlFoto || ''; 
    this.setState({ 
      urlFoto,
      paso1: false
     });

  };

  onSubmit({ descripcion, fotoUrl }) { 
    db.collection('posts').add(
      {
        owner: auth.currentUser.email,
        userName: auth.currentUser.displayName,
        createdAt: Date.now(),
        fotoUrl: fotoUrl,
        descripcion: descripcion,
        likes: [],
        comentario: [],
        arrayPosteos: []
      }
    )
      .then(() => this.props.navigation.navigate('Home'))
      .catch((e) => console.log(e))

  }

  actualizarDescripcion(text) {
    this.setState({
      descripcion: text
    })
  }
  actualizarFotourl(url) {
    this.setState({
      urlFoto: url,
      paso1: false
    })
  }

 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Post</Text>
        {this.state.paso1 ? (

          <>
          <Text style= {styles.title}> Saca tu foto o subela desde la URL! </Text>

            <FormPosteo style={styles.img} actualizarFotourl={(url) => this.actualizarFotourl(url)} />
            
            <Text style= {styles.title}> Sube aqui tu foto! </Text>

            <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(text) => this.actualizarFotourl(text)}
              value={this.state.urlFoto}
              placeholder="https://www.ejemplo.com"
              />
          
          </>

        ) : (
          <>
            <FormPosteoDescripcion
              actualizarDescripcion={(descripcion) => this.actualizarDescripcion(descripcion)}
              estadoDescripcion={this.state.descripcion}
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={() =>
                this.onSubmit({
                  descripcion: this.state.descripcion,
                  fotoUrl: this.state.urlFoto,
                })
              }
            >
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#61dafb',
  },
  input: {

    height: 100,
    width: 280,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    color: '#ffffff',
    borderRadius: 10,
  },
  img:{
    height: 300,
    width: 300,
  },
  sendButton: {
    backgroundColor: '#61dafb',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});