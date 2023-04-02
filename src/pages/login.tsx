import React from "react"
import Head from "next/head"
import { Navigation } from "@/components/organisms/Navigation"

export default function login() {
  return (
    <>
      <Head>
        <title>ログイン | Lunch Maps</title>
        <meta name="description" content="Lunch Mapsのログイン画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>ログイン</h1>
        <Navigation />
      </main>
    </>
  )
}
