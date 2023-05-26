import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CardContextProvider } from "../contexts/card.ctx";
import { CollectionContextProvider } from "../contexts/collection.ctx";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <CollectionContextProvider>
        <CardContextProvider>
          <Component {...pageProps} />
        </CardContextProvider>
      </CollectionContextProvider>
    </SessionProvider>
  );
}
