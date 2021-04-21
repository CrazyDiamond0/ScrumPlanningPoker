import firebase from "./firebase";

export default async function checkifexits(number) {
  const room = "room" + number;
  let values = [];
  let temp = false;
  await firebase
    .database()
    .ref()
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        var temp = snapshot.val();
        values = [...Object.keys(temp)];
        //console.log("inside:", values);
      }
    });
  //console.log("outside", values);
  values.forEach((element) => {
    if (element === room) {
      temp = true;
    }
  });
  return temp;
}
