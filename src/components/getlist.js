import firebase from "./firebase";
import Cookies from "js-cookie";

export default function getlist() {
  const user = Cookies.get("username");
  const room = Cookies.get("yourroom");

  firebase
    .database()
    .ref(room + "/users/")
    .once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val().value);
      });
    });
}
