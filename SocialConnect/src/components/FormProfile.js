import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';

import { db } from '../firebase/config'

import PosteosContainer from './PosteosContainer';

class FormProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cantidadPosteos: 0,
      userData: null
    }
  }

  componentDidMount() {
    this.getUserData(this.props.userEmail)
    this.getPosteos(this.props.userEmail)
  }

  getUserData(userEmail) {
    db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().owner == userEmail) {
          this.setState({
            userData: doc.data()
          })
        }
      });
    });
  }
  
  getPosteos(userEmail) {
    db.collection("posts").onSnapshot((querySnapshot) => {
      const cantidadPosteos = querySnapshot.docs
        .filter((doc) => doc.data().owner === userEmail) // filro para que cumpla con la condicion
        .length;

      this.setState({
        cantidadPosteos: cantidadPosteos
      });
    });
}

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        <View style={styles.container}>

          {this.state.userData ? (
            <View style={styles.userInfoContainer}>
              <Image
                style={styles.img}
                source={{ uri: this.state.userData.fotoPerfil }}

              />
              
              <Text style={styles.label} > Email: </Text>
              <Text style={styles.userData}>{this.props.userEmail}</Text>
              <Text style={styles.label}>Nombre de usuario:</Text>
              <Text style={styles.userData}>{this.state.userData.userName}</Text>
              <Text style={styles.label}>Biografía:</Text>
              <Text style={styles.userData}>{this.state.userData.bio}</Text>
              <Text style={styles.label}>Posteos:</Text>
              <Text style={styles.userData}>{this.state.cantidadPosteos}</Text>
            </View>
          ) : null}

          <PosteosContainer userEmail={this.props.userEmail} navigation={this.props.navigation} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  userData: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '400',
    color: 'white',
  },
  postContainer: {
    marginBottom: 20,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
});

export default FormProfile;