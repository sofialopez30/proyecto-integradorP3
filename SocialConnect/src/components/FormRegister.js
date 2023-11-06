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
            bio = ""; // Establece un valor predeterminado en blanco si bio es nulo
        }

        if (fotoPerfil == null) {
            fotoPerfil = ""; // Establece un valor predeterminado en blanco si fotoPerfil es nulo
        }
        if (userName == null) {
            userName = ""; // Establece un valor predeterminado en blanco si userName es nulo
        }


        // auth.createUserWithEmailAndPassword(email, pass)
        //     .then(res => {
        //         let userData = {
        //             owner: this.state.email,
        //             userName: this.state.userName,
        //             createdAt: Date.now(),
        //             bio: this.state.bio,
        //             fotoPerfil: this.state.fotoPerfil
        //         };

        //         if (bio) {
        //             userData.bio = bio;
        //         }

        //         if (fotoPerfil) {
        //             userData.fotoPerfil = fotoPerfil;
        //         }

        //         db.collection('users').add(userData)
        //             .then(() => {
        //                 console.log("entré")
        //                 // Limpia los estados después del registro
        //                 this.setState({
        //                     email: "",
        //                     userName: "",
        //                     password: "",
        //                     bio: "",
        //                     fotoPerfil: "",
        //                     error: null
        //                 })
        //             })
        //         this.props.navigation.navigate('Login');

        //     })
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => db.collection('users').add({
            owner: this.state.email,
            createdAt: Date.now(),
            name: this.state.name,
            minibio: this.state.minibio
        }))
        .then((resp) => console.log(resp))

            .catch(error => {
                let errorMessage = "Fallo en el registro";
                if (error.code === "auth/email-already-in-use") {
                    errorMessage = "El correo electrónico ya está en uso";
                } else if (error.code === "auth/invalid-email") {
                    errorMessage = "El correo electrónico no es válido";
                } else if (error.code === "auth/weak-password") {
                    errorMessage = "La contraseña es demasiado débil";
                }

                this.setState({ error: error.message });
                console.log(error);
            });

    }

    render() {
        return (
            <View>
                <Text>Registrate a mi App</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ userName: text })}
                        placeholder="user name"
                        keyboardType="default"
                        value={this.state.userName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Pon tu email'
                        keyboardType='email-adress'
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Pon tu password'
                        keyboardType='default'
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ bio: text })}
                        placeholder="mini bio"
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

                    {/* Mostrar el mensaje de error si existe el error */}
                    {this.state.error ? (
                        <Text style={styles.errorText}>{this.state.error}</Text>
                    ) :
                        null}


                    <TouchableOpacity style={styles.button} onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.userName, this.state.bio, this.state.fotoPerfil, this.props.navigation)}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text>¿Ya tenes cuenta? Ir al login</Text>
                    </TouchableOpacity>


                </View>
            </View>


        )
    }

}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 24

    },
    btn: {
        backgroundColor: 'purple',
        padding: 16
    },
    textBn: {
        color: 'white'
    }
})