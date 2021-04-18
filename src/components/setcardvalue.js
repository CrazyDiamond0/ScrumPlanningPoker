import firebase from "./firebase";
import Cookies from "js-cookie";

export default function setcardvalue(value) {
  const user = Cookies.get("username");
  const room = Cookies.get("yourroom");
  const newvalue = {
    value: value,
  };

  firebase
    .database()
    .ref(room + "/users/" + user + "/value")
    .set(value);
}
