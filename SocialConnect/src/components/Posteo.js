import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

import { auth, db } from "../firebase/config";

import { AntDesign } from "@expo/vector-icons";
export default class Posteo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      arrayLikes: [],
      arrayComentarios: [],
      comentario:0,
    };
  }

  componentDidMount() {
    console.log(auth.currentUser)
    console.log(this.props.posteo);
    this.getLikes(this.props.posteo.id);
    this.getComentarios(this.props.posteo.id);
  }

  getComentarios(postId) {
    db.collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        const data = doc.data();
        // const cantidadComentarios = data.comentarios ? data.comentarios.length : 0;
        const cantidadComentarios = data && data.comentarios ? data.comentarios.length : 0;
        this.setState({
          comentario: cantidadComentarios,
        });
      });
  }

  getLikes(postId) {
    db.collection("posts").doc(postId).get().then((doc) => {
      const likes = doc.exists ? doc.data().arrayLikes || [] : [];  // verifica si existe, obtiene el valor de likes y si no hay likes, hago un nuevo array vacio
      this.setState({
        arrayLikes: likes,
        liked: likes.includes(auth.currentUser.email),
      });
    });
  }

  setLike(postId) {
    db.collection("posts")
      .doc(postId)
      .update({
        arrayLikes: this.state.arrayLikes.concat(auth.currentUser.email),
      });
    this.setState({
      liked: true,
      arrayLikes: this.state.arrayLikes.concat(auth.currentUser.email),
    });
  }

  setUnlike(postId) {
    db.collection("posts")
      .doc(postId)
      .update({
        arrayLikes: this.state.arrayLikes.filter(
          (like) => like != auth.currentUser.email
        ),
      });
    this.setState({
      liked: false,
      arrayLikes: this.state.arrayLikes.filter(
        (like) => like != auth.currentUser.email
      ),
    });
  }

  render() {
    const comentario = this.state.comentario;
    const image = this.props.image;
    return (
      <View style={styles.postContainer}>

        <TouchableOpacity
          style={styles.usernameContainer}
          onPress={() =>
            this.props.navigation.navigate("StackProfile", {
              userName: this.props.posteo.data.userName,
            })
          }
        >
          <Text style={styles.usernameText}>{this.props.posteo.data.userName}</Text>
        </TouchableOpacity>
    
        <Image
          source={{ uri: this.props.posteo.data.fotoUrl }}
          style={styles.image}
          resizeMode='cover'
        />
    
        <View style={styles.actionContainer}>

          {this.state.liked ? (

            <TouchableOpacity
              style={styles.likeContainer}
              onPress={() => this.setUnlike(this.props.posteo.id)}
            >
              <AntDesign name="heart" size={24} color="red" />
              <Text style={styles.likeCountText}> {this.state.arrayLikes.length}</Text>
            </TouchableOpacity>

          ) : (

            <TouchableOpacity
              style={styles.likeContainer}
              onPress={() => this.setLike(this.props.posteo.id)}
            >
              <AntDesign name="hearto" size={24} color="black" />
              <Text style={styles.likeCountText}> {this.state.arrayLikes.length}</Text>
            </TouchableOpacity>
            
          )}
        </View>
    
        <Text style={styles.descriptionText}>{this.props.posteo.data.descripcion}</Text>

        <TouchableOpacity
          style={styles.commentContainer}
          onPress={() =>
            this.props.navigation.navigate("Comentarios", {
              postId: this.props.posteo.id,
            })
          }
        >
          <Text style={styles.commentText}>
            {comentario !== undefined ? `Hay ${comentario} Comentarios` : 'Cargando comentarios...'}
          </Text>
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  usernameContainer: {
    marginBottom: 10,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCountText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 15,
    
  },
  commentContainer: {
    marginTop: 15,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
});