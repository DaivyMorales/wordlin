import { cardContext } from "@/contexts/card.ctx";
import { useContext, useState } from "react";
import { BiFont, BiQuestionMark, BiShow, BiX } from "react-icons/bi";

export default function PlayCollection() {
  const { myCards, cards } = useContext(cardContext);

  const [showWord, setShowWord] = useState(0);
  const [answerText, setAnswerText] = useState("");

  const currentCard = cards.find((card) => card._id === myCards.Card[showWord]);

  const changeWord = () => {
    if (answerText === currentCard?.wordTwo) {
      setShowWord((prevIndex) => (prevIndex + 1) % myCards.Card.length);
      setAnswerText("");
      console.log("They're seem");
    } else {
      console.log("Bad");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerText(e.target.value);
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-y-5 justify-center items-center">
      <p className="font-bold">1/10</p>
      <h1 className="font-black text-8xl">{currentCard?.wordOne}</h1>
      <div className=" inputWithEmoji " tabIndex={1}>
        <input
          name="wordTwo"
          type="text"
          className="noInput"
          placeholder="What is it?"
          onChange={handleChange}
          value={answerText}
        />
      </div>
      <button
        onClick={() => {
          changeWord();
        }}
        type="submit"
        className="px-4 py-1"
      >
        I'm sure!
      </button>
    </div>
  );
}
