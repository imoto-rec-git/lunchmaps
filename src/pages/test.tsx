import Head from "next/head"
import { css } from "@emotion/react"
import { NavigationTest } from "@/components/organisms/NavigationTest"
import { useContext } from "react"
import { IsAuthContext } from "./providers/IsAuthProvider"

export default function Test() {
  const { isAuth, setIsAuth } = useContext(IsAuthContext)
  return (
    <>
      <Head>
        <title>test | Lunch Maps</title>
        <meta name="description" content="Lunch MapsのHome画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div css={container}>
          <h1>ログイン</h1>
        </div>
        <NavigationTest />
      </main>
    </>
  )
}

const container = css`
  height: 100vh;
  background: white;
`
