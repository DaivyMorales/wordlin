import { cardContext } from "@/contexts/card.ctx";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function PlayCollection() {
  const { myCards, cards } = useContext(cardContext);

  useEffect(() => {
    if (myCards.Card.length === 0) {
      router.push("/collections");
    }
  }, []);

  const router = useRouter();

  const [showWord, setShowWord] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [bad, setBad] = useState<boolean>(false);

  const currentCard = cards.find((card) => card._id === myCards.Card[showWord]);

  const changeWord = () => {
    if (answerText === currentCard?.wordTwo) {
      if (showWord === myCards.Card.length - 1) {
        console.log("Acabado");
        router.push("/collections");
      }
      setShowWord((prevIndex) => (prevIndex + 1) % myCards.Card.length);
      setAnswerText("");
      console.log("They're seem");
    } else {
      setBad(true);
      console.log(bad);
      console.log("bad");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerText(e.target.value);
    setBad(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      changeWord();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-y-5 justify-center items-center">
      <p className="font-bold">
        {showWord}/{myCards.Card.length}
      </p>
      <h1 className="font-black text-8xl">{currentCard?.wordOne}</h1>
      <div className="flex flex-col justify-center items-center">
        <p
          className={` ${
            !bad ? "hidden" : ""
          } text-xs font-semibold text-red-500`}
        >
          ¡Ups! <span className="errorMsg">You should review it</span>.
        </p>

        <div
          className={` inputWithEmoji shadow-lg w-44 ${
            bad
              ? "focus-within:shadow-red-200 border-red-400"
              : "focus-within:shadow-emerald-200 border-emerald-400"
          }`}
          tabIndex={1}
        >
          <input
            name="wordTwo"
            type="text"
            className={`noInput ${bad ? "text-red-600" : ""}`}
            placeholder="What is it?"
            onChange={handleChange}
            value={answerText}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>
      </div>
      {answerText.length >= 1 && !bad ? (
        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            changeWord();
          }}
          type="submit"
          className="px-4 py-2"
        >
          I'm sure!
        </motion.button>
      ) : (
        <button
          onClick={() => {
            changeWord();
          }}
          className=" buttonDisabled px-4 py-1 "
        >
          I'm sure!
        </button>
      )}
    </div>
  );
}
