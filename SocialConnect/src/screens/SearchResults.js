import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { auth, db } from '../firebase/config'


export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      usuarios: [],
      cargando: null,
    };
  }

  buscarUser(search) {
    this.setState({ cargando: true });

    db.collection('users')
      .get()
      .then((docs) => {
        let arrayUsuarios = [];
        docs.forEach((doc) => {
          let usuario = doc.data();
          let minusUserName = usuario.userName.toLowerCase();
          if (minusUserName.includes(search.toLowerCase())) {
            arrayUsuarios.push(usuario);
          } else {
            let minusEmail = usuario.owner.toLowerCase();
            if (minusEmail.includes(search.toLowerCase())) {
              arrayUsuarios.push(usuario);
            }
          }
        });
        this.setState({ usuarios: arrayUsuarios, cargando: false });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.tit}>&larr;</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Busqueda</Text>

        <View style={styles.searchSection}>

          <TextInput
            style={styles.input}
            placeholder="Buscar un usuario"
            onChangeText={(search) => {
              this.buscarUser(search);
              this.setState({ search });
            }}
            value={this.state.search}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.buscarUser(this.state.search)}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
          
        </View>

        {this.state.cargando === null ? null : this.state.cargando ? (

          <Text>Cargando...</Text>

        ) : this.state.usuarios.length === 0 ? (
          <Text style={styles.title}>No hay usuarios que coincidan con la búsqueda</Text>
        ) : (
          
          <FlatList
             data={this.state.usuarios}
            renderItem={({ item }) => (
              <View style={styles.userContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate( "StackProfile" , {
                       userName: item.userName ,
                    })
                  }>
                  <Text style={styles.userName}>{item.userName}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.createdAt.toString()}
          />
        )}
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
  tit: {
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
