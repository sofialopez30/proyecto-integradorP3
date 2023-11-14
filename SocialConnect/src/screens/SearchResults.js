import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { auth, db } from '../firebase/config'


export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      cargando: null,
      usuarios: [],
    }
  }

  buscarUsuarios(search) {
    this.setState({ cargando: true })
    db.collection("users").where("userName", "==", search).get()
      .then(docs => {
        let arrayUsuarios = []
        console.log('entre')
        if (docs.length === 0) {
          db.collection("users").where("owner", "==", search).get()
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
        <Text style={styles.title}> Busqueda </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.tit}>&larr;</Text>
        </TouchableOpacity>


        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Busca un user"
            onChangeText={(search) => this.setState({ search })}
            value={this.state.search}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.buscarUsuarios(this.state.search)}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>


        {this.state.cargando === null ?
          null :
          this.state.cargando ?
            <ActivityIndicator size="large" color="white" /> :
            this.state.usuarios.length === 0 ?
              <Text style={styles.userName}>El user no existe</Text> :
              <FlatList
                data={this.state.usuarios}
                renderItem={({ item }) =>
                  <View style={styles.userContainer}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("StackProfile", { userName: item.userName })}
                    >
                      <Text style={styles.userName}>{item.userName}</Text>
                    </TouchableOpacity>
                  </View>
                }
                keyExtractor={item => item.userName}
              />
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#282c34',
  },
  tit : {
    color: '#61dafb',
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    marginLeft: 110,
    color: '#61dafb',
  },
  backButton: {
    marginBottom: 20,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    color: '#ffffff',
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: '#61dafb',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#ffffff',
  },
  userContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#61dafb',
    paddingVertical: 10,
  },
  userName: {
    color: '#61dafb',
  },
});
