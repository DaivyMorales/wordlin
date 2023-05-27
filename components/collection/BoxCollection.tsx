import { ICollection, collectionContext } from "@/contexts/collection.ctx";
import { useContext } from "react";
import { BiCollection } from "react-icons/bi";

interface MyProps {
  collection: ICollection;
}

export default function BoxCollection({ collection }: MyProps) {
  const { setCollectionChoose } = useContext(collectionContext);

  return (
    <div className="border-gray-300 p-3 border-1 rounded-lg">
      <div
        onClick={() => setCollectionChoose(collection._id)}
        key={collection._id}
        className="flex justify-start flex-col w-64 items-start gap-2"
      >
        <div className="flex justify-center items-center gap-x-2">
          <div className="p-2 border-1 border-gray-300 rounded-full">
            <BiCollection color="#059669" />
          </div>
          <h5>{collection.name}</h5>
        </div>
        <p className="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
          accusantium soluta ipsum quia veniam rerum
        </p>
      </div>
    </div>
  );
}
