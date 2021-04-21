import firebase from "./firebase";
import Cookies from "js-cookie";

export default async function setalldidfinishtofalse(value) {
  await firebase
    .database()
    .ref()
    .once("value", (snapshot) => {
      snapshot.child(Cookies.get("yourroom") + "/users/").forEach((element) => {
        console.log(element.key);
        firebase
          .database()
          .ref(
            Cookies.get("yourroom") + "/users/" + element.key + "/didfinish/"
          )
          .set(value);

        firebase
          .database()
          .ref(Cookies.get("yourroom") + "/users/" + element.key + "/value/")
          .set("null");
      });
    });
  //console.log(allvalues);
  // firebase
  // .database()
  // .ref(Cookies.get("yourroom") + "/roomsubject")
  // .set(roomsubject);
}
