import setcardvalue from "./components/setcardvalue";
import didfinish from "./components/didfinish";
import { useEffect, useState } from "react";
import firebase from "./components/firebase";
import Cookies from "js-cookie";
import database from "./components/database";
import joinuser from "./components/joinuser";
import checkifexists from "./components/checkifexists";
import deleteonescape from "./components/deleteonescape";

export default function GamePage() {
  const [allvalues, setAllvalues] = useState([]);
  const [result, setResult] = useState("Result");
  const [roomsubject, setRoomsubject] = useState("");

  const looper = async () => {
    setTimeout(() => {
      getlist();
      looper();
    }, 1000);
  };

  useEffect(() => {
    deleteonescape();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    checkifexists(id).then((value) => {
      if (value === true || Cookies.get("username") === "master") {
        Cookies.set("yourroom", "room" + id);
        if (Cookies.get("username") === undefined) {
          joinuser(Cookies.get("yourroom"));
        }
        if (Cookies.get("username") === "master") {
          database(id);
        }
      } else {
        window.location.href = `/`;
      }
    });
  }, []);

  useEffect(() => {
    getlist();
  }, []);

  function handleChange(e) {
    setRoomsubject(e.target.value);
  }
  return (
    <div>
      <form>
        <label>Set room subject</label>
        <input type="text" value={roomsubject} onChange={handleChange}></input>
        <input type="submit" />
      </form>

      <div onClick={() => setcardvalue(0)}>0</div>
      <div onClick={() => setcardvalue(1)}>1</div>
      <div onClick={() => setcardvalue(2)}>2</div>
      <div onClick={() => setcardvalue(3)}>3</div>
      <div onClick={() => setcardvalue(5)}>5</div>
      <div onClick={() => setcardvalue(8)}>8</div>
      <div onClick={() => setcardvalue(13)}>13</div>
      <div onClick={() => setcardvalue(21)}>21</div>
      <div onClick={() => setcardvalue(34)}>34</div>
      <div onClick={() => setcardvalue(55)}>55</div>
      <div onClick={() => setcardvalue(89)}>89</div>
      <div onClick={() => setcardvalue("?")}>?</div>
      <div onClick={() => didfinish()}>Finish</div>
      <div>{allvalues}</div>
      <div>{result}</div>
      <button onClick={() => looper()}>Get List</button>
    </div>
  );

  function getlist() {
    const user = Cookies.get("username");
    const room = Cookies.get("yourroom");
    const allvalues = [];
    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          didallfinish(childSnapshot.child("users").val());
        });
      });
    //console.log(allvalues);
    allvalues.splice(0, allvalues.length);
  }

  function didallfinish(object) {
    let isalltrue = 0;
    let average = 0;
    const thisobject = Object.values(object);
    for (let i = 0; i < thisobject.length; i++) {
      //console.log(Object.values(thisobject[i]));
      if (Object.values(thisobject[i])[0] === true) {
        isalltrue++;
        average += Object.values(thisobject[i])[1];
        //console.log(average);
      }
    }
    if (isalltrue === thisobject.length) {
      setResult(`Everyone checked, Result: ${average / thisobject.length}`);
    }
  }
}
