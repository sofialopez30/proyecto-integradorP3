import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { auth, db } from '../firebase/config';

class ControlesPosteo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deseaEliminar: false
        }
    }

    eliminarPosteo(posteoId) {
        db.collection("posts").doc(posteoId).delete()
            .then(() => {
                console.log("Se borró el posteo. UID:", posteoId);
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    validarEliminacion() {
        this.setState({
            deseaEliminar: !this.state.deseaEliminar
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.validarEliminacion()}>
                    {
                        this.state.deseaEliminar ?
                            <View>
                                <TouchableOpacity onPress={() => this.eliminarPosteo(this.props.posteoId)}>
                                    <Text style={styles.title}>Confirmar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ deseaEliminar: false })}>
                                    <Text style={styles.title}>Cancelar</Text>
                                </TouchableOpacity>
                            </View> :
                            <Text style={styles.title}>Eliminar</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 40,
      marginLeft: 110, 
      color: '#61dafb',
     },
    
  })

export default ControlesPosteo;