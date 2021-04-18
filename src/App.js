import React from "react";
import firebase from "./components/firebase";

function database() {
  const app = firebase.database().ref("Todo");

  const penis = {
    penis1: "321321",
    penis2: "31412412",
  };

  app.push(penis);
}

export default function App() {
  return (
    <div>
      <button onClick={database}>Database</button>
    </div>
  );
}
