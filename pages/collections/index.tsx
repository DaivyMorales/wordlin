import axios from "axios";
import { signOut, useSession } from "next-auth/react";
// const getCollections = async () => {
//   const response = await axios.get("/api/collection");
//   console.log(response);
// };

const { data: session, status } = useSession();
console.log(session);

export default function Collections() {
  return (
    <div>
      Collections{" "}
      {/* <button onClick={() => getCollections()}>Load Collection</button>{" "} */}
    </div>
  );
}
