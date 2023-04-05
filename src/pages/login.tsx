import React, { useState } from "react"
import Head from "next/head"
import { Navigation } from "@/components/organisms/Navigation"

export default function login() {
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(text)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

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
        <form onSubmit={handleSubmit}>
          <p>{text}</p>
          <input type="text" value={text} onChange={handleChange} />
        </form>
        <Navigation />
      </main>
    </>
  )
}
