import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useState } from "react";

interface MyProps {
  children: ReactNode;
}

interface ICollection {
  _id: string;
  name: string;
  Card: string[];
  User: string;
  updatedAt: string;
  createdAt: string;
}

interface IContext {
  getCollections: () => Promise<void>;
}

export const collectionContext = createContext<IContext>({
  getCollections: async () => {},
});

export const CollectionContextProvider = ({ children }: MyProps) => {
  const { data: session, status } = useSession();

  const [collections, setCollections] = useState<ICollection[]>([]);
  console.log(collections);

  const getCollections = async () => {
    const response = await axios.get("/api/colletion");
    setCollections(response.data);
  };

  return (
    <collectionContext.Provider value={{ getCollections }}>
      {children}
    </collectionContext.Provider>
  );
};
