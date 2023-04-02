import React from "react"
import Head from "next/head"
import { Navigation } from "@/components/organisms/Navigation"

export default function favorite() {
  return (
    <>
      <Head>
        <title>お気に入り | Lunch Maps</title>
        <meta name="description" content="Lunch Mapsのお気に入り画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>お気に入り</h1>
        <Navigation />
      </main>
    </>
  )
}
