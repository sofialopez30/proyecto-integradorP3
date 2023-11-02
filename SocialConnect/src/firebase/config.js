import app from 'firebase/app'
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBP3WGCvO6lC6DOKrAg8eg69jK7eSJzAak",
    authDomain: "tp-integradorp3.firebaseapp.com",
    projectId: "tp-integradorp3",
    storageBucket: "tp-integradorp3.appspot.com",
    messagingSenderId: "449736169287",
    appId: "1:449736169287:web:0e9ee34273a69de2eede62"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()
