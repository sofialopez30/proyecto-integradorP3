import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../firebase/config'

export default class FormPosteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            mostrarCamara: true,
            permisos:false,
            urlTemp:'',
        }
        this.metodosDeCamara = null  
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then((resp)=> this.setState({permisos: true}))
        .catch((err) => console.log(err))
    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(imgTemp => this.setState({
            urlTemp: imgTemp.uri,
            mostrarCamara: false
        }))
        .catch(err => console.log(err))
    }

    aceptarFoto() {
        fetch(this.state.urlTemp)
            .then(resp => resp.blob())
            .then(img => {
                const ref = storage.ref(`fotos/${Date.now()}.jpg`);
                ref.put(img)
                    .then(resp => {
                        ref.getDownloadURL()
                            .then((url) => {
                                // Actualiza la URL de la foto en el perfil del usuario
                                this.props.actualizarFotourl(url);
    
                                // Actualiza la cantidad de posteos del usuario
                                const userRef = db.collection("users").doc(auth.currentUser.uid);
                                userRef.update({
                                    arrayPosteos: firebase.firestore.FieldValue.increment(1),
                                });
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    rechazarFoto(){
        this.setState({
            mostrarCamara: true,
            urlTemp: ''
        })
    }

    render() {
        return (
          <View style={styles.container}>
            {this.state.permisos && this.state.mostrarCamara ? (
              <>
                <Camera
                  style={styles.camara}
                  type={Camera.Constants.Type.back}
                  ref={(metodosDeCamara) => (this.metodosDeCamara = metodosDeCamara)}
                />
                <TouchableOpacity onPress={() => this.tomarFoto()} style={styles.button}>
                  <Text style={styles.buttonText}>Tomar foto</Text>
                </TouchableOpacity>
              </>
            ) : this.state.permisos && this.state.mostrarCamara === false ? (
              <>
                <Image
                  source={{ uri: this.state.urlTemp }}
                  style={styles.img}
                  resizeMode={'contain'}
                />
                <TouchableOpacity onPress={() => this.aceptarFoto()} style={styles.button}>
                  <Text style={styles.buttonText}>Aceptar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.rechazarFoto()} style={styles.button}>
                  <Text style={styles.buttonText}>Rechazar Foto</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text>No tienes permisos para usar la cámara</Text>
            )}
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#282c34',
      },
      camara: {
        width: '100%',
        height: 300,
        
      },
      img: {
        height: 300,
      },
      button: {
        backgroundColor: '#61dafb',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
      },
    });