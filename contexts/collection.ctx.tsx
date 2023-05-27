import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useState, useEffect } from "react";

interface MyProps {
  children: ReactNode;
}

export interface ICollection {
  _id: string;
  name: string;
  Card: string[];
  User: string;
  updatedAt: string;
  createdAt: string;
}

interface IContext {
  // getCollections: () => Promise<void>;
  collections: ICollection[];
  setCollections: React.Dispatch<React.SetStateAction<ICollection[]>>;
  collectionChoose: string;
  setCollectionChoose: React.Dispatch<React.SetStateAction<string>>;
}
export const collectionContext = createContext<IContext>({
  collections: [],
  setCollections: () => [],
  collectionChoose: "",
  setCollectionChoose: () => {},
});

export const CollectionContextProvider = ({ children }: MyProps) => {
  const [userId, setUserId] = useState<string | null | undefined>("");
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [collectionChoose, setCollectionChoose] = useState<string>("");

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setUserId(session?.user?._id);
      const getCollections = async () => {
        const response = await axios.get("/api/collection");

        // console.log(response.data);
        const filteredCollections = response.data.filter(
          (item: ICollection) => item.User === session?.user?._id
        );

        setCollections((prevCollections) => [
          ...prevCollections,
          ...filteredCollections,
        ]);
      };

      getCollections();
    }
  }, [status]);

  return (
    <collectionContext.Provider
      value={{
        collections,
        setCollections,
        collectionChoose,
        setCollectionChoose,
      }}
    >
      {children}
    </collectionContext.Provider>
  );
};
