import Head from "next/head"
import { css } from "@emotion/react"
import { useDataContext } from "../providers/DataProvider"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Test() {
  const router = useRouter()
  const { data, setData } = useDataContext()
  const testFunc = () => {
    setData("testです")
    router.push("./favorite")
  }
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
          <p>{data}</p>
          <button onClick={testFunc}>ボタン</button>
        </div>
      </main>
    </>
  )
}

const container = css`
  height: 100vh;
  background: white;
`
