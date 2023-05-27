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
  showCardForm: string;
  setShowCardForm: React.Dispatch<React.SetStateAction<string>>;
}

export const cardContext = createContext<IContext>({
  getCards: async () => {},
  showCardForm: "",
  setShowCardForm: () => {},
});

export const CardContextProvider = ({ children }: MyProps) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [showCardForm, setShowCardForm] = useState<string>("");
  

  const getCards = async () => {
    const response = await axios.get("/api/card");
    setCards(response.data);
  };

  return (
    <cardContext.Provider value={{ getCards, showCardForm, setShowCardForm }}>
      {children}
    </cardContext.Provider>
  );
};
