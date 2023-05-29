import { cardContext } from "@/contexts/card.ctx";
import React, { useContext } from "react";
import { BiFontColor } from "react-icons/bi";

interface MyProps {
  idCard: string;
}

export default function BoxCard({ idCard }: MyProps) {
  const { cards } = useContext(cardContext);

  const filteredCard = cards.find((card) => card._id === idCard);

  return (
    <div className="text-sm shadow-sm font-regular flex px-3 justify-center items-center rounded-md border-1">
      <BiFontColor className="text-gray-500" /> {filteredCard?.wordOne}
    </div>
  );
}
