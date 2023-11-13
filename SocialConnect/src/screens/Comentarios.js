import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FormComentarios from '../components/FormComentarios';
import { db } from '../firebase/config';

export default class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPost: null,
    };
  }

  componentDidMount() {
    db.collection('posts')
      .doc(this.props.route.params.postId)
      .onSnapshot((doc) => {
        this.setState({ dataPost: doc.data() });
      });
  }

  render() {
    return (
      <View style={styles.container}>
         <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                    <Text style={styles.title} >&larr;</Text>
                </TouchableOpacity>
        <Text style={styles.title}>Comments</Text>

            {this.state.dataPost && this.state.dataPost.comentarios ? (
                <FlatList
                    data={this.state.dataPost.comentarios}
                    keyExtractor={(item) => item.createdAt.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentOwner}>{item.owner}</Text>
                            <Text style={styles.commentText}>{item.comentario}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text>Loading comments...</Text>
            )}

        <FormComentarios postId={this.props.route.params.postId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  commentContainer: {
    marginBottom: 16,
  },
  commentOwner: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 16,
  },
});