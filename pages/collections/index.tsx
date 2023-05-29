import { useContext } from "react";
import { cardContext } from "@/contexts/card.ctx";
import { collectionContext } from "@/contexts/collection.ctx";
import BoxCollection from "../../components/collection/BoxCollection";
import { BiPlusCircle, BiHdd } from "react-icons/bi";
import AddCard from "@/components/card/AddCard";
import axios from "axios";

export default function Collections() {
  const { getCards, showCardForm, setShowCardForm } = useContext(cardContext);
  const { collections, collectionChoose, setCollections } =
    useContext(collectionContext);

  const updateCollection = async (cards: object) => {
    const response = await axios.put(
      `/api/collection/${collectionChoose}`,
      cards
    );
    setCollections(
      collections.map((collection) => {
        if (collection._id === collectionChoose) {
          return response.data;
        } else {
          return collection;
        }
      })
    );
  };

  return (
    <div className="relative z-10 w-screen h-screen flex gap-4 justify-center items-center flex-col">
      <div className="rounded-full flex justify-center items-center gap-x-2 border-1 px-5 bg-emerald-100 border-emerald-500">
        <BiHdd className="text-emerald-500" size={22} />
        <h3 className="font-semibold text-emerald-600 ">Collections</h3>
      </div>
      <div className="grid p-3  grid-cols-1 gap-y-3">
        <div className="flex  justify-center items-center">
          <button className="bg-white p-2 rounded-lg border-1 border-gray-200">
            <BiPlusCircle size={22} color="#71717a" />
          </button>
        </div>
        {collections.map((collection) => (
          <BoxCollection collection={collection} key={collection._id} />
        ))}
      </div>
      {showCardForm ? <AddCard /> : ""}
    </div>
  );
}
