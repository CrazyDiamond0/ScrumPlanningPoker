import React, { useState } from "react";
import database from "./components/database";
import joinuser from "./components/joinuser";

export default function MainPage() {
  const [inputroomnumber, setInputroomnumber] = useState(0);

  const handleChange = (e) => {
    setInputroomnumber(e.target.value);
  };
  return (
    <div>
      <input type="number" value={inputroomnumber} onChange={handleChange} />
      <button onClick={() => database()}>Create Room</button>
      <button onClick={() => joinuser(inputroomnumber)}>Join Room</button>
    </div>
  );
}
