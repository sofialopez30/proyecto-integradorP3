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

        if (!email || !password) {
            this.setState({ error: "Por favor, completa todos los campos obligatorios." });
            return; // Salir de la función si faltan campos
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log("Login OK")
                this.setState({ login: true });

                // Hay que limpiar los estados despues de el log in

            this.props.navigation.navigate('Home')
            })
            .catch(error => {
                let errorMessage = "Fallo en el registro";
                if (error.code === "auth/email-already-in-use") {
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
          <View style={styles.formContainer}>
            <Text style={styles.title}>Inicia sesión en SocialConnect</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              value={this.state.email}
            />
    
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder="Contraseña"
              keyboardType="default"
              secureTextEntry={true}
              value={this.state.password}
            />
    
            {this.state.error ? (
              <Text style={styles.errorText}>{this.state.error}</Text>
            ) : null}
    
            <TouchableOpacity style={styles.button} onPress={() => this.login(this.state.email, this.state.password)}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.registerLink} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.registerLinkText}>¿No tienes cuenta? Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      formContainer: {
        width: '80%',
        backgroundColor: '#282c34',
        padding: 20,
        borderRadius: 10,
        
      },
      title: {
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
      button: {
        backgroundColor: '#61dafb',
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