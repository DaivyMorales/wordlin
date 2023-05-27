import { collectionContext } from "@/contexts/collection.ctx";
import { useContext } from "react";

export default function AddCard() {
  const { collectionInfo } = useContext(collectionContext);
  return (
    <div className="add">
      <div className="bg-white rounded-lg">
        <h1>{collectionInfo.name}</h1>
      </div>
    </div>
  );
}
