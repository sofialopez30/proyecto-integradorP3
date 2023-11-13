import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native'


export default class FormRegister extends Component {
    constructor() {
        super()

        this.state = {
            email: "",
            userName: "",
            password: "",
            bio: "",
            fotoPerfil: "",
            error: null

        }
    }


    registrarUsuario(email, pass, userName, bio, fotoPerfil) {

        if (bio == null) {
            bio = ""; 
        }

        if (fotoPerfil == null) {
            fotoPerfil = ""; 
        }
        if (userName == null) {
            userName = "";
        }


        auth.createUserWithEmailAndPassword(email, pass)
            // Actualiza el nombre de usuario. Porque cuando se crea un usuario, el nombre de usuario es nulo
            .then((user) => {
                user.user.updateProfile({
                    displayName: userName
                })
            })
            // Agrega el usuario a la colección de usuarios
            .then(res => {
                let userData = {
                    owner: this.state.email,
                    userName: this.state.userName,
                    email: this.state.email,
                    createdAt: Date.now(),
                    bio: this.state.bio,
                    fotoPerfil: this.state.fotoPerfil
                };

                if (bio) {
                    userData.bio = bio;
                }

                if (fotoPerfil) {
                    userData.fotoPerfil = fotoPerfil;
                }

                db.collection('users').add(userData)
                    .then(() => {
                        console.log("entré")
                        // Limpia los estados después del registro
                        this.setState({
                            email: "",
                            userName: "",
                            password: "",
                            bio: "",
                            fotoPerfil: "",
                            error: null
                        })
                        auth.signOut();
                    })
                    .then(() => {
                        this.props.navigation.navigate('Login');
                    })
            })
            .catch(error => {
                let errorMessage = "Fallo en el registro";
                if (error.code === "auth/email-already-in-use") {
                    errorMessage = "El correo electrónico ya está en uso";
                } else if (error.code === "auth/invalid-email") {
                    errorMessage = "El correo electrónico no es válido";
                } else if (error.code === "auth/weak-password") {
                    errorMessage = "La contraseña es demasiado débil";
                } else if (error.code = "auth/invalid-email") {
                    errorMessage = "El correo electrónico está mal formateado";
                }

                this.setState({ error: error.message });
                console.log(error);
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Regístrate en SocialConnect</Text>
                
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ userName: text })}
                        placeholder="Nombre de usuario"
                        keyboardType="default"
                        value={this.state.userName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Correo electrónico'
                        keyboardType='email-adress'
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Contraseña'
                        keyboardType='default'
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ bio: text })}
                        placeholder="Mini biografía"
                        keyboardType="default"
                        value={this.state.bio}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ fotoPerfil: text })}
                        placeholder="URL para foto de perfil"
                        keyboardType="default"
                        value={this.state.fotoPerfil}
                    />

                    {this.state.error ? (
                        <Text style={styles.errorText}>{this.state.error}</Text>
                    ) : null}

                    {!this.state.userName || !this.state.email || !this.state.password ? (
                        <TouchableOpacity style={styles.buttonDisabled} onPress={() => alert("Debe completar los campos")}>
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.buttonEnabled} onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.userName, this.state.bio, this.state.fotoPerfil, this.props.navigation)}>
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style= {styles.loginLink} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style= {styles.loginLink}>¿Ya tienes cuenta? Ir al login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282c34', 
        padding: 20, 
     
    },
    formContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#282c34',
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
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
        backgroundColor: '#7f848e',
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
    loginLink: {
        color: '#61dafb',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 14,
        fontWeight: 'bold'
    },
});