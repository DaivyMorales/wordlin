import { useContext } from "react";
import { cardContext } from "@/contexts/card.ctx";
import { collectionContext } from "@/contexts/collection.ctx";
import BoxCollection from "../../components/collection/BoxCollection";
import { BiPlusCircle } from "react-icons/bi";

export default function Collections() {
  const { getCards } = useContext(cardContext);
  const { collections } = useContext(collectionContext);

  return (
    <div className="w-screen h-screen flex gap-4 justify-center items-center flex-col">
      <div className=" rounded-full border-1 px-5">
        <h3 className="font-black  text-emerald-600 ">Collections</h3>
      </div>
      {/* <button onClick={() => getCards()}>Load Cards</button> */}
      <div className="grid grid-cols-1 gap-y-3">
        <div className="flex  justify-center items-center">
          <button className="bg-white p-2 rounded-lg border-1 border-gray-200">
            <BiPlusCircle size={22} color="#71717a" />
          </button>
        </div>
        <div className="straight-line"></div>
        {collections.map((collection) => (
          <BoxCollection collection={collection} />
        ))}
      </div>
    </div>
  );
}
