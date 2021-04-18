import firebase from "./firebase";
import Cookies from "js-cookie";

export default function joinuser(roomnumber) {
  const random = Math.floor(Math.random() * (10000 - 1000) + 1000);
  Cookies.set("username", "user" + random);
  Cookies.set("yourroom", "room" + roomnumber);
  const user = {
    value: 0,
    didfinish: false,
  };

  firebase
    .database()
    .ref("room" + roomnumber + "/users/" + "user" + random)
    .set(user);
}
