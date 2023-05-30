import { cardContext } from "@/contexts/card.ctx";
import React, { useContext } from "react";
import { BiFontColor } from "react-icons/bi";
export default function BoxCard() {
  return (
    <div className="text-sm shadow-sm font-regular flex px-3 justify-center items-center rounded-md border-1">
      {" "}
      <BiFontColor className="text-gray-500" /> Write
    </div>
  );
}
