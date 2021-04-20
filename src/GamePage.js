import setcardvalue from "./components/setcardvalue";
import didfinish from "./components/didfinish";
import { useEffect, useState, useRef } from "react";
import firebase from "./components/firebase";
import Cookies from "js-cookie";
import database from "./components/database";
import joinuser from "./components/joinuser";
import checkifexists from "./components/checkifexists";
import deleteonescape from "./components/deleteonescape";
import selectSubjectFirebase from "./components/selectSubjectFirebase";

export default function GamePage() {
  const [allvalues, setAllvalues] = useState([]);
  const [result, setResult] = useState("Result");
  const [roomsubject, setRoomsubject] = useState("");
  const [buttonstatus, setButtonstatus] = useState(true);
  const [formhidden, setFormHidden] = useState(true);
  const [userlist, setUserList] = useState([]);
  const [resetbutton, setResetbutton] = useState(true);

  function buttonReset() {
    if (Cookies.get("username") === "master") {
      setFormHidden(false);
    }
    setButtonstatus(true);
  }

  useEffect(() => {
    if (Cookies.get("username") === "master") {
      setFormHidden(false);
      setResetbutton(false);
    }
    deleteonescape();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    Cookies.set("yourroom", "room" + id);

    checkifexists(id).then(async (value) => {
      if (value === true || Cookies.get("username") === "master") {
        if (Cookies.get("username") === undefined) {
          await joinuser();
        }
        if (Cookies.get("username") === "master") {
          await database(id);
        }
      } else {
        window.location.href = `/`;
      }
    });
    setTimeout(() => getSubject(), 2000);
    setTimeout(() => getlist(), 2000);
    setTimeout(() => getusers(), 2000);
  }, []);

  function handleChange(e) {
    setRoomsubject(e.target.value);
  }
  function selectSubject() {
    //console.log(roomsubject);
    selectSubjectFirebase(roomsubject);
    setFormHidden(true);
    setButtonstatus(false);
  }

  return (
    <div>
      <h3>{roomsubject}</h3>
      <div hidden={formhidden}>
        <label>Set room subject</label>
        <input type="text" value={roomsubject} onChange={handleChange}></input>
        <button onClick={selectSubject}>Select subject</button>
      </div>

      <button disabled={buttonstatus} onClick={() => setcardvalue(0)}>
        0
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(1)}>
        1
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(2)}>
        2
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(3)}>
        3
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(5)}>
        5
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(8)}>
        8
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(13)}>
        13
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(21)}>
        21
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(34)}>
        34
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(55)}>
        55
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue(89)}>
        89
      </button>
      <button disabled={buttonstatus} onClick={() => setcardvalue("?")}>
        ?
      </button>
      <button
        disabled={buttonstatus}
        onClick={() => {
          didfinish();
          setButtonstatus(true);
        }}
      >
        Finish
      </button>
      <div>{allvalues}</div>
      <div>{result}</div>
      <div>{userlist}</div>
      <button onClick={() => getlist()}>Get List</button>
      <button hidden={resetbutton} onClick={() => buttonReset()}>
        Reset
      </button>
    </div>
  );

  function getSubject() {
    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        if (
          snapshot.child(Cookies.get("yourroom")).val().roomsubject !==
            undefined &&
          snapshot.child(Cookies.get("yourroom")).val().roomsubject !== "null"
        ) {
          setRoomsubject(
            snapshot.child(Cookies.get("yourroom")).val().roomsubject
          );
          setButtonstatus(false);
        }
      });
  }
  function getusers() {
    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        setUserList(
          Object.keys(
            snapshot.child(Cookies.get("yourroom")).child("users").val()
          )
        );
      });
  }

  async function getlist() {
    // const user = Cookies.get("username");
    //const room = Cookies.get("yourroom");
    await firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        didallfinish(
          snapshot.child(Cookies.get("yourroom")).child("users").val()
        );
      });
    //console.log(allvalues);
  }

  async function didallfinish(object) {
    // const objectarray = [...Object.keys(object)];

    // for (let element of objectarray) {
    //   if (object[element]["didfinish"] === true) {
    //     console.log("penis");
    //   }
    // }
    const thisobject = Object.values(object);
    console.log(thisobject);
    let isalltrue = 0;
    let average = 0;
    for (let i = 0; i < thisobject.length; i++) {
      console.log(Object.values(thisobject[i]));
      if (Object.values(thisobject[i])[0] === true) {
        isalltrue++;
        if (Object.values(thisobject[i])[1] !== "?") {
          average += Object.values(thisobject[i])[1];
        }
        //console.log(average);
      }
    }
    console.log(isalltrue);
    console.log(thisobject.length);
    if (isalltrue === thisobject.length) {
      setResult(`Everyone checked, Result: ${average / thisobject.length}`);
    } else {
      setResult("Result");
    }
  }
}
