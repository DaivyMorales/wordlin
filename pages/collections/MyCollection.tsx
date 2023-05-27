import { collectionContext } from "@/contexts/collection.ctx";
import React from "react";
import { useContext } from "react";

export default function MyCollection() {
  const { collectionChoose, setCollectionChoose } =
    useContext(collectionContext);

  return (
    <div className="">
      <h1 className="font-bold">My collections</h1>
    </div>
  );
}
