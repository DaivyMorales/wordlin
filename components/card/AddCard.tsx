import { cardContext } from "@/contexts/card.ctx";
import { collectionContext } from "@/contexts/collection.ctx";
import { useContext, useEffect, useState } from "react";
import { BiCollection, BiLowVision, BiShow, BiX } from "react-icons/bi";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import BoxCard from "./BoxCard";
import { motion } from "framer-motion";
import Link from "next/link";

export interface ICardState {
  Card: string[];
}

export default function AddCard() {
  const {
    collectionInfo,
    setCollectionInfo,
    setCollections,
    collections,
    collectionChoose,
  } = useContext(collectionContext);
  const {
    setShowCardForm,
    setCards,
    cards,
    myCards,
    setMyCards,
    createCard,
    deleteCard,
  } = useContext(cardContext);

  const { data: session } = useSession();

  useEffect(() => {
    setMyCards({
      Card: collectionInfo.Card.map((card) => card),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      wordOne: "",
      wordTwo: "",
    },
    onSubmit: async (values, { resetForm }) => {
      createCard(values);
      resetForm();
    },
  });

  return (
    <div className="add">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className=" bg-white border-gray-300 py-3 border-1 rounded-xl shadow-md"
      >
        <div
          style={{ width: "600px" }}
          className="flex justify-start flex-col  items-start gap-y-2"
        >
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
                setMyCards({
                  Card: [],
                });
              }}
              className="text-gray-500 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <BiX className="" size={17} />
            </div>
          </div>
          <hr className="w-full" />
          <div className="w-full px-3">
            <p className="text-xs">
              Creator:{" "}
              <span className="text-black font-medium">
                {session?.user.name}
              </span>
            </p>
            <div></div>
          </div>
          <hr />
          <div className="scroll-div w-full p-3">
            {/* Words */}
            <div className="flex flex-wrap gap-2">
              {myCards.Card.map((cardId) => (
                <BoxCard cardId={cardId} key={cardId} />
              ))}
            </div>
          </div>
          <hr className="" />
          <form
            onSubmit={formik.handleSubmit}
            className=" w-full px-4 flex-col flex gap-y-3 justify-center items-center"
          >
            <div className="flex gap-x-2">
              <div className="flex flex-col w-full">
                {/* <label htmlFor="">Word one</label> */}
                <div className="inputWithEmoji w-full" tabIndex={1}>
                  <BiShow className="text-gray-500" />
                  <input
                    onChange={formik.handleChange}
                    name="wordOne"
                    type="text"
                    className="noInput"
                    placeholder="Front word"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                {/* <label htmlFor="">Word Two</label> */}
                <div className="inputWithEmoji w-full" tabIndex={1}>
                  <BiLowVision className="text-gray-500" />
                  <input
                    onChange={formik.handleChange}
                    name="wordTwo"
                    type="text"
                    className="noInput"
                    placeholder="Back word"
                  />
                </div>
              </div>
              <button type="submit" className="px-4 py-1">
                Add
              </button>
            </div>
          </form>
          <button>
            <Link href="/collections/PlayCollection">Play</Link>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
