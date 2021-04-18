import firebase from "./firebase";
import Cookies from "js-cookie";

export default function database() {
  Cookies.set("username", "master");
  const random = Math.floor(Math.random() * (10000 - 1000) + 1000);
  Cookies.set("yourroom", "room" + random);
  const room = {
    roomsubject: "idk",
    users: {
      master: {
        value: 0,
        didfinish: false,
      },
    },
  };

  firebase
    .database()
    .ref("room" + random)
    .set(room);
}
