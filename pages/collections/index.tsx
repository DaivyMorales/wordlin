import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useContext } from "react";
import { cardContext } from "@/contexts/card.ctx";
import { collectionContext } from "@/contexts/collection.ctx";

export default function Collections() {
  const { getCards } = useContext(cardContext);
  const { collections } = useContext(collectionContext);

  return (
    <div>
      Collections <button onClick={() => getCards()}>Load Cards</button>
      <div>
        {collections.map((collection) => (
          <div key={collection._id}>{collection.name}</div>
        ))}
      </div>
    </div>
  );
}
