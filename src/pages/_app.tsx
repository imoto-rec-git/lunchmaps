import "@/styles/globals.css"
import "@/styles/reset.css"
import type { AppProps } from "next/app"
import { IsAuthProvider } from "../providers/IsAuthProvider"
// import { DataProvider } from "../providers/DataProvider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <IsAuthProvider>
        {/* <DataProvider> */}
        <Component {...pageProps} />;{/* </DataProvider> */}
      </IsAuthProvider>
    </>
  )
}
