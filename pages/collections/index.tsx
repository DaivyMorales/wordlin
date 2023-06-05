import { useContext, useEffect, useRef, useState } from "react";
import { ICard, cardContext } from "@/contexts/card.ctx";
import { collectionContext } from "@/contexts/collection.ctx";
import BoxCollection from "../../components/collection/BoxCollection";
import AddCard from "@/components/card/AddCard";
import { GetServerSidePropsContext } from "next";

interface MyProps {
  data: ICard[];
}

export default function Collections({ data }: MyProps) {
  const { showCardForm, setCards } = useContext(cardContext);
  const { collections, setDropDownSelected } = useContext(collectionContext);

  useEffect(() => {
    setCards(data);
  }, []);

  // useEffect(() => {
  //   const handleClick = () => {
  //     setDropDownSelected("");
  //   };

  //   document.addEventListener("mousedown", handleClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, []);

  return (
    <div className="relative z-10 w-screen h-screen flex gap-4 justify-center items-center flex-col">
      <div className="flex justify-center items-start flex-col">
        <div className="rounded-full flex justify-start  items-center gap-x-2 px-5 border-emerald-500">
          <h1 className="font-semibold text-emerald-700 ">My Collections</h1>
        </div>

        <div
          className={`grid p-3 ${
            collections.length <= 1 ? "grid-cols-1" : "grid-cols-2"
          }  gap-1`}
        >
          {collections.map((collection) => (
            <BoxCollection collection={collection} key={collection._id} />
          ))}
        </div>
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
