import { ICollection, collectionContext } from "@/contexts/collection.ctx";
import { useContext } from "react";
import { BiDotsVerticalRounded, BiPlay } from "react-icons/bi";

interface MyProps {
  collection: ICollection;
}

export default function BoxCollection({ collection }: MyProps) {
  const { setCollectionChoose, dropDownSelected, setDropDownSelected } =
    useContext(collectionContext);

  return (
    <div className="p-2 bg-white rounded-xl border-1 border-gray-200">
      <div
        onClick={() => setCollectionChoose(collection._id)}
        key={collection._id}
        className="flex justify-start flex-col w-72  items-start gap-y-2"
      >
        <div className="flex justify-between items-center w-full gap-x-2">
          <div className="flex  gap-x-2 justify-center  items-center">
            <div className="p-1 border-1 border-gray-300 rounded-md">
              <BiPlay color="#059669" size={22} />
            </div>
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
                // setShowCardForm(collection._id);
                // setCollectionInfo({
                //   _id: collection._id,
                //   name: collection.name,
                //   Card: collection.Card,
                //   User: collection.User,
                //   updatedAt: collection.updatedAt,
                //   createdAt: collection.createdAt,
                // });
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
                <p className="text-xs">hola</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
