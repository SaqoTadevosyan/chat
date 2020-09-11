import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBrbawXGMSmWtNf0Zbo4cyb0s5TNEb1nbc",
    authDomain: "heyu-b9875.firebaseapp.com",
    databaseURL: "https://heyu-b9875.firebaseio.com",
    projectId: "heyu-b9875",
    storageBucket: "heyu-b9875.appspot.com",
    messagingSenderId: "768608491191",
    appId: "1:768608491191:web:86e222148742a0d5255f32"
};

let fire=firebase.initializeApp(firebaseConfig);
export default fire