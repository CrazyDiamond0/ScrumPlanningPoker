import firebase from "./firebase";
import Cookies from "js-cookie";

export default function getlist() {
  const user = Cookies.get("username");
  const room = Cookies.get("yourroom");
  const allvalues = [];
  firebase
    .database()
    .ref(room + "/users/")
    .on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val().value);
      });
    });

  return allvalues;
}
