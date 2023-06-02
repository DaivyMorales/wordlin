import { cardContext } from "@/contexts/card.ctx";
import { ICollection, collectionContext } from "@/contexts/collection.ctx";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BiCollection, BiLinkExternal } from "react-icons/bi";

interface MyProps {
  collection: ICollection;
}

export default function BoxCollection({ collection }: MyProps) {
  const { setCollectionChoose, setCollectionInfo } =
    useContext(collectionContext);
  const { setShowCardForm } = useContext(cardContext);

  return (
    <div className="p-3 bg-white rounded-xl border-1 border-gray-200">
      <div
        onClick={() => setCollectionChoose(collection._id)}
        key={collection._id}
        className="flex justify-start flex-col w-72  items-start gap-y-2"
      >
        <div className="flex justify-between items-center w-full gap-x-2">
          <div className="flex  gap-x-2 justify-center  items-center">
            <div className="p-2 border-1 border-gray-300 rounded-md">
              <BiCollection color="#059669" />
            </div>
            <div>
              <p className="text-sm text-black font-semibold">
                {collection.name}
              </p>
              <p className="text-xs">{collection.Card.length} words</p>
            </div>
          </div>

          <div className="flex gap-x-1">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowCardForm(collection._id);
                setCollectionInfo({
                  _id: collection._id,
                  name: collection.name,
                  Card: collection.Card,
                  User: collection.User,
                  updatedAt: collection.updatedAt,
                  createdAt: collection.createdAt,
                });
              }}
            >
              <BiLinkExternal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
