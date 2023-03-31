import Head from "next/head"
import { css } from "@emotion/react"
import { Map } from "@/components/Map"
import { Navigation } from "@/components/Navigation"
import { Splash } from "@/components/Splash"

const maps = css`
  background: var(--color-white);
  height: calc(100vh - 70px);
`

export default function Home() {
  return (
    <>
      <Head>
        <title>Lunch Maps</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Splash />
        <section>
          <div css={maps}>
            <Map />
          </div>
        </section>
        <Navigation />
      </main>
    </>
  )
}
