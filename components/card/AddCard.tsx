import { cardContext } from "@/contexts/card.ctx";
import { collectionContext } from "@/contexts/collection.ctx";
import { useContext, useEffect } from "react";
import {
  BiCollection,
  BiFontColor,
  BiLowVision,
  BiShow,
  BiX,
} from "react-icons/bi";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";

export default function AddCard() {
  const { collectionInfo, setCollectionInfo } = useContext(collectionContext);
  const { setShowCardForm, createCard } = useContext(cardContext);

  const { data: session } = useSession();

  useEffect(() => {
    console.log("Collection id:", collectionInfo._id);
  }, []);

  const formik = useFormik({
    initialValues: {
      wordOne: "",
      wordTwo: "",
    },
    onSubmit: async (values, { resetForm }) => {
      createCard(values);
      console.log(values);
      resetForm();
      setShowCardForm("");
      setCollectionInfo({
        _id: "",
        name: "",
        Card: [],
        User: "",
        updatedAt: "",
        createdAt: "",
      });
    },
  });

  return (
    <div className="add">
      <div className=" bg-white border-gray-300 p-3 border-1 rounded-lg shadow-md">
        <div className="flex justify-start flex-col w-96 items-start gap-y-2">
          <div className="flex justify-between items-center w-full gap-x-2">
            <div className="flex gap-x-2 justify-center items-center">
              <div className="p-2 border-1 border-gray-300 rounded-full">
                <BiCollection color="#059669" />
              </div>
              <div className="flex flex-col">
                <h4>{collectionInfo.name}</h4>
                <p className="text-xs">
                  By {session?.user.name}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setShowCardForm("");
                setCollectionInfo({
                  _id: "",
                  name: "",
                  Card: [],
                  User: "",
                  updatedAt: "",
                  createdAt: "",
                });
              }}
              className="text-gray-500 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <BiX className="" size={17} />
            </div>
          </div>
          <hr className="w-full" />
          <form
            onSubmit={formik.handleSubmit}
            className="w-full p-4 flex flex-col gap-y-3 justify-center items-start"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="">Word one</label>
              <div className="inputWithEmoji w-full">
                <BiShow className="text-gray-500" />
                <input
                  onChange={formik.handleChange}
                  name="wordOne"
                  type="text"
                  className="noInput"
                  placeholder="Add one word"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">Word Two</label>
              <div className="inputWithEmoji w-full">
                <BiLowVision className="text-gray-500" />
                <input
                  onChange={formik.handleChange}
                  name="wordTwo"
                  type="text"
                  className="noInput"
                  placeholder="Add two word"
                />
              </div>
            </div>
            <button type="submit" className="w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
