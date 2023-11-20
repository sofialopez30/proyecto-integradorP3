import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth } from '../firebase/config'


export default class CambiarContrasena extends Component {
    constructor(props) {
      super(props);
      this.state = {
        nuevaContra: "",
        error: null,
        cambiandoContrasena: false,
      };
    }
  
    cambiarContrasena() {
      let nuevaContra = this.state.nuevaContra
  
      if (nuevaContra.length < 6) {
        this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
        return;
      }

      auth.currentUser.updatePassword(nuevaContra)
        .then(() => {
          console.log("Contraseña cambiada correctamente");
          auth.signOut();
          this.props.navigation.navigate("Login");
          Alert.alert("Contraseña cambiada correctamente");
        })
        .catch((error) => {
          console.log("Error al cambiar la contraseña", error);
          this.setState({ error: error.message });
        });
    }
  
    render() {
        let cambiandoContrasena= this.state.cambiandoContrasena
  
      return (
        <View>
          {cambiandoContrasena ? (
            <View>
              <TextInput
                placeholder="Ingrese nueva contraseña"
                keyboardType="default"
                onChangeText={(text) => this.setState({nuevaContra: text })}
                secureTextEntry={true}
                style={styles.input}
              />
              {this.state.error ? 
              <Text style={styles.errorText}>{this.state.error}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={() => this.cambiarContrasena()}>
                <Text style={styles.buttonText}>Confirmar Contraseña</Text>
              </TouchableOpacity>

            </View>
          ) : (
            
            <TouchableOpacity style={styles.button} onPress={() => this.setState({ cambiandoContrasena: true })}>
              <Text style={styles.buttonText}>Cambiar Contraseña</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'white'
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
