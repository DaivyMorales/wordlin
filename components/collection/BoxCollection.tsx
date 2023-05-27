import { cardContext } from "@/contexts/card.ctx";
import { ICollection, collectionContext } from "@/contexts/collection.ctx";
import { useContext } from "react";
import { BiCollection, BiFontColor, BiDuplicate } from "react-icons/bi";

interface MyProps {
  collection: ICollection;
}

export default function BoxCollection({ collection }: MyProps) {
  const { setCollectionChoose, setCollectionInfo } =
    useContext(collectionContext);
  const { showCardForm, setShowCardForm } = useContext(cardContext);

  return (
    <div className="border-gray-300 p-3 border-1 rounded-lg shadow-md">
      <div
        onClick={() => setCollectionChoose(collection._id)}
        key={collection._id}
        className="flex justify-start flex-col w-72  items-start gap-y-2"
      >
        <div className="flex justify-between items-center w-full gap-x-2">
          <div className="flex gap-x-2 justify-center items-center">
            <div className="p-2 border-1 border-gray-300 rounded-full">
              <BiCollection color="#059669" />
            </div>
            <h5>{collection.name}</h5>
          </div>
          <div className="flex gap-x-1">
            <BiFontColor className="text-gray-400" />
            <h5 className="text-xs text-gray-400">34 Words</h5>
          </div>
        </div>
        <hr />
        <button
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
          className="flex gap-x-1 justify-center items-center text-xs border-1 text-black px-3 shadow-sm py-1 rounded-md"
        >
          <BiDuplicate />
          Add
        </button>
        <p className="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
          accusantium soluta ipsum quia veniam rerum
        </p>
      </div>
    </div>
  );
}
