import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { collectionContext } from "./collection.ctx";

interface MyProps {
  children: ReactNode;
}

interface ICard {
  _id: string;
  wordOne: string;
  wordTwo: string;
  updatedAt: string;
  createdAt: string;
}

interface IContext {
  getCards: () => Promise<void>;
  showCardForm: string;
  setShowCardForm: React.Dispatch<React.SetStateAction<string>>;
  createCard: (body: object) => Promise<void>;
}

export const cardContext = createContext<IContext>({
  getCards: async () => {},
  showCardForm: "",
  setShowCardForm: () => {},
  createCard: async (body) => {},
});

export const CardContextProvider = ({ children }: MyProps) => {
  const { cardsArray, setCardsArray } = useContext(collectionContext);

  const [cards, setCards] = useState<ICard[]>([]);
  const [showCardForm, setShowCardForm] = useState<string>("");

  const getCards = async () => {
    const response = await axios.get("/api/card");
    setCards(response.data);
  };

  const createCard = async (body: object) => {
    const response = await axios.post("/api/card", body);
    setCards([...cards, response.data]);
    setCardsArray([...cardsArray, response.data._id]);
  };

  return (
    <cardContext.Provider
      value={{ getCards, showCardForm, setShowCardForm, createCard }}
    >
      {children}
    </cardContext.Provider>
  );
};
