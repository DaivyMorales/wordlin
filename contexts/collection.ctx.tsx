import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useState, useEffect } from "react";

interface MyProps {
  children: ReactNode;
}

export interface ICollection {
  _id: string;
  name: string;
  Card: [];
  User: string;
  updatedAt: string;
  createdAt: string;
}

interface IContext {
  collections: ICollection[];
  setCollections: React.Dispatch<React.SetStateAction<ICollection[]>>;
  collectionChoose: string;
  setCollectionChoose: React.Dispatch<React.SetStateAction<string>>;
  collectionInfo: {
    _id: String;
    name: String;
    Card: [];
    User: String;
    updatedAt: String;
    createdAt: String;
  };
  setCollectionInfo: React.Dispatch<React.SetStateAction<ICollection>>;
}
export const collectionContext = createContext<IContext>({
  collections: [],
  setCollections: () => [],
  collectionChoose: "",
  setCollectionChoose: () => {},
  collectionInfo: {
    _id: "",
    name: "",
    Card: [],
    User: "",
    updatedAt: "",
    createdAt: "",
  },
  setCollectionInfo: () => {},
});

export const CollectionContextProvider = ({ children }: MyProps) => {
  const [userId, setUserId] = useState<string | null | undefined>("");
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [collectionChoose, setCollectionChoose] = useState<string>("");
  const [collectionInfo, setCollectionInfo] = useState<ICollection>({
    _id: "",
    name: "",
    Card: [],
    User: "",
    updatedAt: "",
    createdAt: "",
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setUserId(session?.user?._id);
      const getCollections = async () => {
        const response = await axios.get("/api/collection");

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
        collectionInfo,
        setCollectionInfo,
      }}
    >
      {children}
    </collectionContext.Provider>
  );
};
