import { cardContext } from "@/contexts/card.ctx";
import { ICollection, collectionContext } from "@/contexts/collection.ctx";
import { useContext, useEffect } from "react";
import { BiDotsVerticalRounded, BiPlay, BiBookOpen } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import Link from "next/link";

interface MyProps {
  collection: ICollection;
}

export default function BoxCollection({ collection }: MyProps) {
  const {
    setCollectionChoose,
    dropDownSelected,
    setDropDownSelected,
    setCollectionInfo,
    collectionInfo,
    deleteCollection,
  } = useContext(collectionContext);

  const { setShowCardForm, setMyCards } = useContext(cardContext);

  useEffect(() => {
    setMyCards({
      Card: collectionInfo.Card.map((card) => card),
    });
  }, []);

  return (
    <div className="p-2 bg-white rounded-xl border-1 border-gray-200">
      <div
        onClick={() => setCollectionChoose(collection._id)}
        key={collection._id}
        className="flex justify-start flex-col w-72  items-start gap-y-2"
      >
        <div className="flex justify-between items-center w-full gap-x-2">
          <div className="flex  gap-x-2 justify-center  items-center">
            <Link
              href={"/collections/PlayCollection"}
              className="p-1 border-1 border-gray-300 rounded-md"
            >
              <BiPlay color="#059669" size={22} />
            </Link>
            <div>
              <p className="text-sm text-black font-semibold">
                {collection.name}
              </p>
              <p className="text-xs">{collection.Card.length} words</p>
            </div>
          </div>

          <div className="relative flex gap-x-1">
            <div
              className="cursor-pointer"
              onClick={() => {
                if (dropDownSelected === collection._id) {
                  setDropDownSelected("");
                } else {
                  setDropDownSelected(collection._id);
                }
              }}
            >
              <BiDotsVerticalRounded />
            </div>

            {dropDownSelected === collection._id && (
              <div className="dropdown-content">
                <Link
                  className="flex cursor-pointer gap-x-1 w-full p-1 hover:bg-gray-200"
                  href="/collections/PlayCollection"
                  onClick={() => {
                    setDropDownSelected("");
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
                  <BsFillPlayFill className="text-emerald-800" />
                  <p className="text-xs font-semibold text-emerald-800">Play</p>
                </Link>
                <hr className="w-full" />
                <div
                  onClick={() => {
                    setDropDownSelected("");
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
                  className="flex cursor-pointer gap-x-1 w-full p-1 hover:bg-gray-200"
                >
                  <BiBookOpen />
                  <p className="text-xs font-normal text-black">Words</p>
                </div>
                <hr className="w-full" />
                <p
                  onClick={() => {
                    deleteCollection(collection._id);
                  }}
                  className="text-red-600 cursor-pointer font-normal  p-1 w-full text-xs hover:bg-red-200 hover:text-red-700 rounded-b-lg"
                >
                  Delete Collection
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
