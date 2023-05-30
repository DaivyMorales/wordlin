import { cardContext } from "@/contexts/card.ctx";
import { collectionContext } from "@/contexts/collection.ctx";
import { useContext, useEffect, useState } from "react";
import {
  BiCollection,
  BiFontColor,
  BiLowVision,
  BiShow,
  BiX,
} from "react-icons/bi";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import BoxCard from "./BoxCard";
import { motion } from "framer-motion";

interface ICardState {
  Card: string[];
}

export default function AddCard() {
  const { collectionInfo, setCollectionInfo } = useContext(collectionContext);
  const { setShowCardForm, createCard } = useContext(cardContext);

  const [myCards, setMyCards] = useState<ICardState>({
    Card: [],
  });

  const { data: session } = useSession();

  useEffect(() => {
    setMyCards({
      Card: [collectionInfo._id.toString()],
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      wordOne: "",
      wordTwo: "",
    },
    onSubmit: async (values, { resetForm }) => {
      // createCard(values);
      // console.log(values);
      resetForm();
      // setShowCardForm("");
    },
  });

  return (
    <div className="add">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className=" bg-white border-gray-300 py-3 border-1 rounded-xl shadow-md"
      >
        <div className="flex justify-start flex-col w-96  items-start gap-y-2">
          <div className="flex justify-between items-center  px-3 w-full gap-x-2">
            <div className="flex gap-x-2 justify-center items-center">
              <div className="p-2 border-1 border-gray-300 rounded-full">
                <BiCollection color="#059669" />
              </div>
              <div className="flex flex-col">
                <h4>{collectionInfo.name}</h4>
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
          <div className="w-full px-3">
            <p className="text-xs">Creator: {session?.user.name}</p>
            <div></div>
          </div>
          <hr />
          <div className=" w-full px-3">
            {/* Words */}
            <div className="flex">
              {myCards.Card.map((cardId) => (
                <BoxCard cardId={cardId} key={cardId} />
              ))}
            </div>
          </div>
          <hr className="" />
          <form
            onSubmit={formik.handleSubmit}
            className=" w-full p-4 flex-col flex gap-y-3 justify-center items-start"
          >
            <div className="flex gap-x-2">
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
            </div>
            <button type="submit" className="w-full">
              Add
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
