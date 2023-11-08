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
    };
  }

  componentDidMount() {
    console.log(auth.currentUser)
    console.log(this.props.posteo);
    this.getLikes(this.props.posteo.id);
    this.getComentarios(this.props.posteo.id);
  }

  getComentarios(postId) {
    db.collection("posts").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id == postId) {
          this.setState({
            arrayComentarios: doc.data().comentarios || [],
          });
        }
      });
    });
  }

  getLikes(postId) {
    db.collection("posts").onSnapshot((querySnapshot) => {
      let likes;
      querySnapshot.forEach((doc) => {
        if (doc.id == postId) {
          likes = doc.data().arrayLikes || [];
        }
      });
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
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("StackProfile", {
              userName: this.props.posteo.data.userName,
            })
          }
        >
          <Text>{this.props.posteo.data.userName}</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: this.props.posteo.data.image }}
          style={styles.image}
        />
        <Text>{this.props.posteo.data.description}</Text>
        {this.state.liked ? (
          <TouchableOpacity
            onPress={() => this.setUnlike(this.props.posteo.id)}
          >
            <AntDesign name="heart" size={24} color="red" />
            <Text> {this.state.arrayLikes.length}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.setLike(this.props.posteo.id)}>
            <AntDesign name="hearto" size={24} color="black" />
            <Text> {this.state.arrayLikes.length}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Comentarios", {
              postId: this.props.posteo.id,
            })
          }
        >
          <Text>Comentarios</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});