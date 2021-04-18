import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCFjFObWPZrrlsu-imVOMGjmpcMy8izx9I",
  authDomain: "scrumpoker-1ef0c.firebaseapp.com",
  databaseURL:
    "https://scrumpoker-1ef0c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scrumpoker-1ef0c",
  storageBucket: "scrumpoker-1ef0c.appspot.com",
  messagingSenderId: "427907831749",
  appId: "1:427907831749:web:e3fae234e97824b3a31dac",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
