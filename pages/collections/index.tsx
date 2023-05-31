import { useContext, useEffect } from "react";
import { ICard, cardContext } from "@/contexts/card.ctx";
import { collectionContext } from "@/contexts/collection.ctx";
import BoxCollection from "../../components/collection/BoxCollection";
import { BiPlusCircle, BiHdd } from "react-icons/bi";
import AddCard from "@/components/card/AddCard";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

interface MyProps {
  data: ICard[];
}

export default function Collections({ data }: MyProps) {
  const { getCards, showCardForm, setCards } = useContext(cardContext);
  const { collections, collectionChoose, setCollections } =
    useContext(collectionContext);

  useEffect(() => {
    setCards(data);
  }, []);

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await fetch("http://localhost:3000/api/card");
  const data = await response.json();

  return {
    props: { data },
  };
}
