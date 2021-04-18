import setcardvalue from "./components/setcardvalue";
import didfinish from "./components/didfinish";

export default function GamePage() {
  return (
    <div>
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
    </div>
  );
}
