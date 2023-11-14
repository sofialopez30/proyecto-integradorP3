import React, { Component } from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'
import {auth, db} from '../firebase/config'

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
        terminoBuscado: "",
        usuarios: [],
        cargando: null
    }
}

buscarUsuarios(terminoBuscado) {
    this.setState({ cargando: true })
    db.collection("users").where("userName", "==", terminoBuscado).get()
    .then(docs => {
        let arrayUsuarios = []
        console.log('entre')
        if (docs.length === 0) {
            db.collection("users").where("owner", "==", terminoBuscado).get()
                .then(docs => {
                    docs.forEach(doc => {
                        arrayUsuarios.push(doc.data())
                    })
                    this.setState({ usuarios: arrayUsuarios, cargando: false })
                })
                .catch(error => console.log(error))
        } else {
          console.log('entre2')
            docs.forEach(doc => {
                arrayUsuarios.push(doc.data())
            })
            this.setState({ usuarios: arrayUsuarios, cargando: false })
        }
    })
    .catch(error => console.log(error))
}


render() {
  return (
      <View style={styles.container}>
          <TouchableOpacity
              style={styles.backButton}
              onPress={() => this.props.navigation.goBack()}
          >
              <Text>&larr;</Text>
          </TouchableOpacity>

          { // Sección 1: formulario de búsqueda
              <View  style={styles.searchSection}>
                  <TextInput
                      style={styles.input}
                      placeholder="Buscar un usuario"
                      onChangeText={( terminoBuscado ) => this.setState({ terminoBuscado })}
                      value={ this.state.terminoBuscado }
                  />
                  <TouchableOpacity 
                      style={styles.searchButton}
                      onPress={() => this.buscarUsuarios(this.state.terminoBuscado)}>
                      <Text  style={styles.searchButtonText}>Buscar</Text>
                  </TouchableOpacity>
              </View>
          }

          { // Sección 2: listado de usuarios
              this.state.cargando === null ?
                  null :
                  this.state.cargando ?
                      <Text>Cargando...</Text> :
                      <FlatList
                      data={this.state.usuarios}
                      renderItem={({ item }) => 
                          <View style={styles.userContainer}>
                              <TouchableOpacity
                                  onPress={() => this.props.navigation.navigate("StackProfile", { email: item.email })}
                              >
                                  <Text  style={styles.userName} >{item.userName}</Text>
                              </TouchableOpacity>
                          </View>
                      }
                      keyExtractor={item => item.email}
                  />
      }
  </View>
)
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#282c34', 
  },
  title: {
    fontSize: 25,
    color: '#61dafb',
   },
});