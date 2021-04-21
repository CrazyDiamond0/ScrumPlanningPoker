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
import setalldidfinishtofalse from "./components/setalldidfinishtofalse";
import "./GamePage.css";

export default function GamePage() {
  const [allvalues, setAllvalues] = useState([]);
  const [result, setResult] = useState("");
  const [roomsubject, setRoomsubject] = useState("");
  const [buttonstatus, setButtonstatus] = useState(true);
  const [formhidden, setFormHidden] = useState(true);
  const [userlist, setUserList] = useState([]);
  const [resetbutton, setResetbutton] = useState(true);
  const [finalvalueslist, setFinalvalueslist] = useState([]);
  const [isresetbutttonactive, setIsResetButtonActive] = useState(true);

  function buttonReset() {
    if (Cookies.get("username") === "master") {
      setFormHidden(false);
    }
    setIsResetButtonActive(true);
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
    //setTimeout(() => allowselectingListener(), 2000);
    setTimeout(() => killappListener(), 2000);
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

  const printuserandvalues = () => {
    const temp = [];
    for (let i = 0; i < userlist.length; i++) {
      temp.push(
        <div>
          User:{userlist[i]}
          Value:{finalvalueslist[i]}
        </div>
      );
    }
    console.log(temp);
    return temp;
  };

  return (
    <div className="game-container">
      <div className="main-window">{result}</div>
      <div className="top-left-bar">
        <div>
          ROOM ID: {new URLSearchParams(window.location.search).get("id")}
        </div>
        <div>MY USER: {Cookies.get("username")}</div>
      </div>
      <div className="center-left-bar">
        <div>{allvalues}</div>

        <div className="user-box">
          {userlist.map((user, index) => (
            <div>
              {user}
              {"   "}
              <label style={{ color: "hsl(60, 50%, 60%)" }}>
                {finalvalueslist[index]}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-left-bar"></div>
      <div className="game-title">
        <h2>Subject</h2>
        <h3>{roomsubject}</h3>
        <div className="subject-input-container" hidden={formhidden}>
          <input
            className="subject-input"
            placeholder="Type a room subject"
            type="text"
            value={roomsubject}
            onChange={handleChange}
          ></input>
          <button
            className="btn btn-primary subject-btn"
            onClick={selectSubject}
          >
            Select subject
          </button>
        </div>
      </div>
      <div className="cards-container">
        <div className="reset-finish-buttons">
          <button
            className="finish-button"
            hidden={resetbutton}
            disabled={isresetbutttonactive}
            onClick={() => {
              buttonReset();
              didfinish(false);
              setButtonstatus(true);
              selectSubjectFirebase("null");
              setalldidfinishtofalse(false);
            }}
          >
            Reset
          </button>
          <button
            className="finish-button"
            disabled={buttonstatus}
            onClick={() => {
              didfinish(true);
              setButtonstatus(true);
              setIsResetButtonActive(false);
            }}
          >
            Finish
          </button>
        </div>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(0)}
        >
          0
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(1)}
        >
          1
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(2)}
        >
          2
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(3)}
        >
          3
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(5)}
        >
          5
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(8)}
        >
          8
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(13)}
        >
          13
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(21)}
        >
          21
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(34)}
        >
          34
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(55)}
        >
          55
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue(89)}
        >
          89
        </button>
        <button
          className="game-card"
          disabled={buttonstatus}
          onClick={() => setcardvalue("?")}
        >
          ?
        </button>
      </div>
    </div>
  );

  function killappListener() {
    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        if (
          snapshot.child(Cookies.get("yourroom")).child("killapp").val() ===
          true
        ) {
          if (Cookies.get("username") !== "master") {
            window.location.href = `/`;
          }
        }
      });
  }

  function setAllowselecting(value) {
    const user = Cookies.get("username");
    const room = Cookies.get("yourroom");

    firebase
      .database()
      .ref(room + "/users/" + user + "/allowselecting")
      .set(value);

    setTimeout(() => setButtonstatus(value), 200);
  }

  function allowselectingListener() {
    const user = Cookies.get("username");
    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        setButtonstatus(
          snapshot
            .child(Cookies.get("yourroom"))
            .child("users")
            .child(user)
            .child("allowselecting")
            .val()
        );
      });
  }

  function getSubject() {
    const user = Cookies.get("username");
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
          if (
            snapshot
              .child(Cookies.get("yourroom"))
              .child("users")
              .child(user)
              .child("value")
              .val() === "null"
          )
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
    //console.log(thisobject.length);
    if (thisobject.length >= 2) {
      let isalltrue = 0;
      let average = 0;
      let valueslist = [];
      for (let i = 0; i < thisobject.length; i++) {
        //console.log(Object.values(thisobject[i]));
        if (Object.values(thisobject[i])[1] === true) {
          isalltrue++;
          average += Object.values(thisobject[i])[2];
          valueslist.push(Object.values(thisobject[i])[2]);
          //console.log(average);
        }
      }

      //console.log(finalvalueslist);
      //console.log(isalltrue);
      //console.log(thisobject.length);
      if (isalltrue === thisobject.length) {
        setResult(`Everyone checked, Result: ${average / thisobject.length}`);
        setFinalvalueslist(valueslist);
      } else {
        setResult("Waiting for everyone to check");
      }
    } else {
      setResult("There is only one user in the lobby");
    }
  }
}
