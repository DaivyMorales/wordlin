import { cardContext } from "@/contexts/card.ctx";
import React, { useContext } from "react";
import { BiFontColor } from "react-icons/bi";

interface MyProps {
  cardId: String;
}

export default function BoxCard({ cardId }: MyProps) {
  const { cards } = useContext(cardContext);

  const cardFound = cards.find((card) => cardId === card._id);

  return (
    <div className="text-sm shadow-sm font-medium flex px-3 justify-center items-center rounded-md border-1">
      <BiFontColor className="text-gray-500" /> {cardFound?.wordOne}
    </div>
  );
}
