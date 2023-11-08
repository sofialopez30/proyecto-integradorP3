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
                                <Text>Confirmar</Text>
                            </TouchableOpacity> ---
                            <TouchableOpacity onPress={() => this.setState({deseaEliminar: false})}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View> : 
                        <Text>Eliminar</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

export default ControlesPosteo;