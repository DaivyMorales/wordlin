import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useContext } from "react";
import { cardContext } from "@/contexts/card.ctx";

export default function Collections() {
  const { getCards } = useContext(cardContext);
  return (
    <div>
      Collections <button onClick={() => getCards()}>Load Collection</button>{" "}
    </div>
  );
}
