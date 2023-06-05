import { cardContext } from "@/contexts/card.ctx";
import React, { useContext, useEffect, useState } from "react";
import { BiFontColor } from "react-icons/bi";
import { motion } from "framer-motion";

interface MyProps {
  cardId: String;
}

export default function BoxCard({ cardId }: MyProps) {
  const { cards, deleteCard } = useContext(cardContext);

  const [hover, setHover] = useState<boolean>(false);

  const cardFound = cards.find((card) => cardId === card._id);

  return (
    <motion.div
      onClick={() => {
        deleteCard(cardFound?._id);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
      className={`text-sm shadow-sm font-medium flex cursor-pointer px-3 justify-center items-center rounded-md border-1 ${
        hover ? "text-red-500 border-red-600" : ""
      }`}
    >
      <BiFontColor className={`${hover ? "text-red-300" : "text-gray-500"}`} />{" "}
      {cardFound?.wordOne}
    </motion.div>
  );
}
