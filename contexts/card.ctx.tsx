import axios from "axios";
import { createContext, ReactNode, useState } from "react";

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
}

export const cardContext = createContext<IContext>({
  getCards: async () => {},
});

export const CardContextProvider = ({ children }: MyProps) => {
  const [cards, setCards] = useState<ICard[]>([]);
  console.log(cards);

  const getCards = async () => {
    const response = await axios.get("/api/card");
    setCards(response.data);
  };

  return (
    <cardContext.Provider value={{ getCards }}>{children}</cardContext.Provider>
  );
};
