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
  collections: ICollection[];
  setCollections: React.Dispatch<React.SetStateAction<ICollection[]>>;
  collectionChoose: string;
  setCollectionChoose: React.Dispatch<React.SetStateAction<string>>;
  collectionInfo: {
    _id: String;
    name: String;
    Card: string[];
    User: String;
    updatedAt: String;
    createdAt: String;
  };
  setCollectionInfo: React.Dispatch<React.SetStateAction<ICollection>>;
  cardsArray: {
    Card: string[];
  };
  setCardsArray: React.Dispatch<React.SetStateAction<string[]>>;
  updateCollection: (cards: object) => Promise<void>;
  dropDownSelected: string;
  setDropDownSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const collectionContext = createContext<IContext>({
  collections: [],
  setCollections: () => [],
  collectionChoose: "",
  setCollectionChoose: () => {},
  collectionInfo: {
    _id: "",
    name: "",
    Card: [""],
    User: "",
    updatedAt: "",
    createdAt: "",
  },
  setCollectionInfo: (cards: object) => {},
  cardsArray: {
    Card: [""],
  },
  setCardsArray: () => [],
  updateCollection: async () => {},
  dropDownSelected: "",
  setDropDownSelected: () => {},
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
  const [cardsArray, setCardsArray] = useState<any>({
    Card: [],
  });
  const [dropDownSelected, setDropDownSelected] = useState<string>("");
  console.log(dropDownSelected);

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

  const updateCollection = async (cards: object) => {
    const response = await axios.put(
      `/api/collection/${collectionChoose}`,
      cards
    );
    setCollections(
      collections.map((collection) => {
        if (collection._id === collectionChoose) {
          return response.data;
        } else {
          return collection;
        }
      })
    );
  };

  return (
    <collectionContext.Provider
      value={{
        collections,
        setCollections,
        collectionChoose,
        setCollectionChoose,
        collectionInfo,
        setCollectionInfo,
        cardsArray,
        setCardsArray,
        updateCollection,
        dropDownSelected,
        setDropDownSelected,
      }}
    >
      {children}
    </collectionContext.Provider>
  );
};
