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

export interface ICardState {
  Card: string[];
}

interface IContext {
  getCards: () => Promise<void>;
  showCardForm: string;
  setShowCardForm: React.Dispatch<React.SetStateAction<string>>;
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  myCards: ICardState;
  setMyCards: React.Dispatch<React.SetStateAction<ICardState>>;
  createCard: (body: object) => Promise<void>;
  deleteCard: (id: string | undefined) => Promise<void>;
}

export const cardContext = createContext<IContext>({
  getCards: async () => {},
  showCardForm: "",
  setShowCardForm: () => {},
  cards: [],
  setCards: () => [],
  myCards: {
    Card: [],
  },
  setMyCards: () => {},
  createCard: async (body: object) => {},
  deleteCard: async (id: string | undefined) => {},
});

export const CardContextProvider = ({ children }: MyProps) => {
  const { updateCollection } = useContext(collectionContext);

  const [cards, setCards] = useState<ICard[]>([]);
  const [showCardForm, setShowCardForm] = useState<string>("");
  const [myCards, setMyCards] = useState<ICardState>({
    Card: [],
  });

  const getCards = async () => {
    const response = await axios.get("/api/card");
    setCards(response.data);
  };

  const createCard = async (body: object) => {
    const response = await axios.post("/api/card", body);
    setCards([...cards, response.data]);

    if (response.status === 200) {
      const updatedCards = {
        Card: [...myCards.Card, response.data._id],
      };
      setMyCards(updatedCards);
      await updateCollection(updatedCards);
    }
  };

  const deleteCard = async (id: string | undefined) => {
    const response = await axios.delete(`/api/card/${id}`);
    setCards(cards.filter((card) => card._id !== id));

    if (response.status === 200) {
      const updatedCards = {
        Card: myCards.Card.filter((crd) => crd !== id),
      };
      setMyCards(updatedCards);
      await updateCollection(updatedCards);
    }
  };

  return (
    <cardContext.Provider
      value={{
        getCards,
        showCardForm,
        setShowCardForm,
        cards,
        setCards,
        myCards,
        setMyCards,
        createCard,
        deleteCard,
      }}
    >
      {children}
    </cardContext.Provider>
  );
};
