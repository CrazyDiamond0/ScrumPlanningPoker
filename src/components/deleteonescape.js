import Cookies from "js-cookie";
import firebase from "./firebase";

export default async function deleteonescape() {
  await window.addEventListener("beforeunload", function (e) {
    if (Cookies.get("username") !== "master") {
      firebase
        .database()
        .ref(Cookies.get("yourroom") + "/users/" + Cookies.get("username"))
        .set(null);
    } else {
      firebase
        .database()
        .ref(Cookies.get("yourroom") + "/killapp/")
        .set(true);

      firebase.database().ref(Cookies.get("yourroom")).set(null);
    }
    Cookies.remove("username");
    Cookies.remove("yourroom");
    //console.log("I  DIED");
  });

  await window.addEventListener("unload", function (event) {
    if (Cookies.get("username") !== "master") {
      firebase
        .database()
        .ref(Cookies.get("yourroom") + "/users/" + Cookies.get("username"))
        .set(null);
    } else {
      firebase
        .database()
        .ref(Cookies.get("yourroom") + "/killapp/")
        .set(true);

      firebase.database().ref(Cookies.get("yourroom")).set(null);
    }
    //console.log("I  LEFT");
    Cookies.remove("username");
    Cookies.remove("yourroom");
  });
}
