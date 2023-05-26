import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useState, useEffect } from "react";

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
  // getCollections: () => Promise<void>;
  collections: ICollection[];

  setCollections: React.Dispatch<React.SetStateAction<ICollection[]>>;
}
export const collectionContext = createContext<IContext>({
  // getCollections: async () => {},
  collections: [],
  setCollections: () => [],
});

export const CollectionContextProvider = ({ children }: MyProps) => {
  const [userId, setUserId] = useState<string | null | undefined>("");
  const [collections, setCollections] = useState<ICollection[]>([]);
  // console.log("collections:", collections);

  const { data: session, status } = useSession();
  console.log(session);

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
    <collectionContext.Provider value={{ collections, setCollections }}>
      {children}
    </collectionContext.Provider>
  );
};
