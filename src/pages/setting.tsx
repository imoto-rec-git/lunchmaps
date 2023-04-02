import React from "react"
import Head from "next/head"
import { Navigation } from "@/components/organisms/Navigation"

export default function setting() {
  return (
    <>
      <Head>
        <title>設定 | Lunch Maps</title>
        <meta name="description" content="Lunch Mapsの設定画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>設定</h1>
        <Navigation />
      </main>
    </>
  )
}
