import firebase from "./firebase";
import Cookies from "js-cookie";

export default async function joinuser() {
  const random = Math.floor(Math.random() * (10000 - 1000) + 1000);
  Cookies.set("username", "user" + random);
  const user = {
    value: 0,
    didfinish: false,
  };
  console.log("AM INTRAT IN JOIN USER");
  await firebase
    .database()
    .ref(Cookies.get("yourroom") + "/users/" + Cookies.get("username"))
    .set(user);
}

// function getexistinglist() {
//   const user = Cookies.get("username");
//   const room = Cookies.get("yourroom");
//   const allvalues = [];
//   firebase
//     .database()
//     .ref()
//     .on("value", (snapshot) => {
//       snapshot.forEach((childSnapshot) => {
//         console.log(childSnapshot.child("users").val());
//         didallfinish(childSnapshot.child("users").val());
//       });
//     });
//   console.log(allvalues);
//   allvalues.splice(0, allvalues.length);
// }

// function ifroomexits(room) {
//   const allvalues = [];
//   let temp = false;
//   firebase
//     .database()
//     .ref()
//     .once("value", (snapshot) => {
//       snapshot.forEach((childSnapshot) => {
//         allvalues.push(childSnapshot.key);
//       });
//     });
//   console.log(allvalues);
//   allvalues.forEach((element) => {
//     //console.log("element", element);
//     //console.log("room", room);
//     if (element === room) {
//       //console.log("penis");
//       temp = true;
//     }
//   });
//   //console.log(temp);
//   return temp;
// }
