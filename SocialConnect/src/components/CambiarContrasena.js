// import React, { Component } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import { auth } from '../firebase/config';

// export default class CambiarContrasena extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     currentPassword: '',
//     newPassword: '',
//   };
// }

// handleChangePassword = async () => {
//   const { currentPassword, newPassword } = this.state;

//   try {
//     const user = auth().currentUser;
//     const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
//     await user.reauthenticateWithCredential(credential);
//     await user.updatePassword(newPassword);
//     Alert.alert('Contraseña cambiada con éxito');
//   } catch (error) {
//     Alert.alert('Error al cambiar la contraseña', error.message);
//   }
// };

// render() {
//   return (
//     <View style={styles.container}>
//       <TextInput
//         secureTextEntry
//         placeholder="Contraseña actual"
//         style={styles.input}
//         value={this.state.currentPassword}
//         onChangeText={(text) => this.setState({ currentPassword: text })}
//       />
//       <TextInput
//         secureTextEntry
//         placeholder="Nueva contraseña"
//         style={styles.input}
//         value={this.state.newPassword}
//         onChangeText={(text) => this.setState({ newPassword: text })}
//       />
//       <Button title="Cambiar Contraseña" onPress={this.handleChangePassword} />
//     </View>
//   );
// }
// }

// const styles = StyleSheet.create({
// container: {
// flex: 1,
// justifyContent: 'center',
// alignItems: 'center',
// padding: 16,
// },
// input: {
// height: 40,
// width: '80%',
// borderColor: 'gray',
// borderWidth: 1,
// marginVertical: 10,
// padding: 8,
// },
// });