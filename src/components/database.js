import firebase from "./firebase";

export default function database(random) {
  console.log("AM INTRAT IN DB");
  const room = {
    roomsubject: "null",
    result: 0,
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
