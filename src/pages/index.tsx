import Head from 'next/head'
import { Splash } from '@/components/molecules/Splash'
import { Navigation } from '@/components/organisms/Navigation'
import { Homes } from '@/components/organisms/Home'
import { HeadTitleMap } from '@/components/molecules/HeadTitleMap'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Lunch Maps</title>
        <meta name='description' content='Lunch MapsのHome画面' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HeadTitleMap />
      <main>
        <Splash />
        <Homes />
        <Navigation />
      </main>
    </>
  )
}
