import Head from 'next/head'
import React from 'react'

export const HeadMeta = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="./images/apple-touch-icon-180x180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="./images/apple-touch-icon-167x167.png"
      />
    </Head>
  )
}
