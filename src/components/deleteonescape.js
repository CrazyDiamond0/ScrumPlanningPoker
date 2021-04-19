import Cookies from "js-cookie";
import firebase from "./firebase";

export default function deleteonescape() {
  window.addEventListener("beforeunload", function (e) {
    firebase.database
      .ref(
        "room" + Cookies.get("yourroom") + "/users/" + Cookies.get("username")
      )
      .remove();
  });

  window.addEventListener("unload", function (event) {
    firebase.database.ref("room" + Cookies.get("yourroom"));
  });
}
