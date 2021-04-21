import firebase from "./firebase";

export default function database(random) {
  //console.log("AM INTRAT IN DB");
  const room = {
    killapp: false,
    roomsubject: "null",
    users: {
      master: {
        value: "null",
        didfinish: false,
        allowselecting: true,
      },
    },
  };

  firebase
    .database()
    .ref("room" + random)
    .set(room);
}
