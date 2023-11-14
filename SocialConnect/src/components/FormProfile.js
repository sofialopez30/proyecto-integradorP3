import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

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
        // console.log(this.props.userEmail)
        this.getUserData(this.props.userEmail)
        // this.getPosteos(this.props.userEmail)
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
            let cantidadPosteos = 0
            querySnapshot.forEach((doc) => {
                if (doc.data().userEmail == userEmail) {
                    cantidadPosteos++
                }
            })
            this.setState({
                cantidadPosteos: cantidadPosteos
            })
        });
    }
   
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label} > Email: </Text>
        <Text style={styles.userData}>{this.props.userEmail}</Text>

        {this.state.userData ? (
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Nombre de usuario:</Text>
            <Text style={styles.userData}>{this.state.userData.userName}</Text>
            <Text style={styles.label}>Biografía:</Text>
            <Text style={styles.userData}>{this.state.userData.bio}</Text>
            <Text style={styles.label}>Foto de perfil:</Text>
            <Text style={styles.userData}>{this.state.userData.fotoPerfil}</Text>
          </View>
        ) : null}

        {
          this.state.cantidadPosteos > 0 ?
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Posteos:</Text>
            <Text style={styles.userData}>{this.state.cantidadPosteos}</Text>
          </View> :
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Posteos:</Text>
            <Text style={styles.userData}>0</Text>
          </View> 
        }

        <PosteosContainer userEmail={this.props.userEmail} navigation={this.props.navigation} />
      </View>
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
  },
  label: {
    paddingTop:10,
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
});

export default FormProfile;