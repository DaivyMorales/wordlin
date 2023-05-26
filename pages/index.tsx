import Link from "next/link";
import { signOut, useSession, getCsrfToken } from "next-auth/react";
import { useContext } from "react";
import { cardContext } from "@/contexts/card.ctx";

export default function index() {
  const { data: session, status } = useSession();
  console.log(session);


  return (
    <div>
      {session ? (
        <>
        <button onClick={() => signOut()}>Sign out</button>
        <br />
        <Link className="btn btn-outline" href="/collections">
          My Collections
        </Link>
        </>
      ) : (
        <Link className="btn btn-outline" href="/auth/SignIn">
          Sign In
        </Link>
      )}
    </div>
  );
}
