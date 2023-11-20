import React, { Component } from 'react'
import { auth } from '../firebase/config'
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class FormLogin extends Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
            error: null

        }
    }

    login(email, password) {

        if (!email || !password) {  // si alguna O otra no esta completa tira esto
            this.setState({ error: "Por favor, completa todos los campos obligatorios." });
            return; 
        }

      auth.signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log("Login OK")
          this.setState({ login: true });
          this.props.navigation.navigate('Home')
        })
            .catch(error => {
                let errorMessage = "Fallo en el registro";
                if (error.code === "auth/email-already-in-use") {   //agarro los errores que me tira la consola, poara mandar que es lo que falta
                    errorMessage = "El correo electrónico ya está en uso";
                } else if (error.code === "auth/invalid-email") {
                    errorMessage = "El correo electrónico no es válido";
                } else if (error.code === "auth/weak-password") {
                    errorMessage = "La contraseña es demasiado débil";
                }
                this.setState({ error: errorMessage });
            });
    }

    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.titulo}>Inicia sesión en SocialConnect</Text>

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />
    
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              keyboardType="default"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />
    
            {this.state.error ? (
              <Text style={styles.errorText}>{this.state.error}</Text>
            ) : null}
    

            {!this.state.email || !this.state.password ? (
              <TouchableOpacity style={styles.buttonDisabled} onPress={() => alert('Debe completar los campos')}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            ) : (

              <TouchableOpacity style={styles.buttonEnabled} onPress={() => this.login(this.state.email, this.state.password)}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>

            )}
    
            <TouchableOpacity style={styles.registerLink} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.registerLinkText}>¿No tienes cuenta? Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        width: '80%',
        backgroundColor: '#282c34',
        padding: 20,
        borderRadius: 10,
        
      },
      titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#61dafb',
      },
      input: {
        borderWidth: 1,
        borderColor: '#61dafb',
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        color: '#282c34',
      },
      buttonEnabled: {
        backgroundColor: '#61dafb',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonDisabled: {
        backgroundColor: 'grey',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
      errorText: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
      },
      registerLink: {
        marginTop: 15,
        alignItems: 'center',
      },
      registerLinkText: {
        color: '#61dafb',
        fontSize: 14,
        fontWeight: 'bold',
      },
    });