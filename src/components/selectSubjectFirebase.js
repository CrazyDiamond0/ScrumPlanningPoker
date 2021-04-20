import firebase from "./firebase";
import Cookies from "js-cookie";

export default async function selectSubjectFirebase(roomsubject) {
  await firebase
    .database()
    .ref(Cookies.get("yourroom") + "/roomsubject")
    .set(roomsubject);
}
