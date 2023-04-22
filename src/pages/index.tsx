import Head from 'next/head'
import { Splash } from '@/components/molecules/Splash'
import { Navigation } from '@/components/organisms/Navigation'
import { Homes } from '@/components/organisms/Home'
import { HeadTitleMap } from '@/components/molecules/HeadTitleMap'

export default function Home() {
  return (
    <>
      <Head>
        <title>LunchMaps</title>
        <meta name='description' content='Lunch Maps' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='./images/apple-touch-icon-180x180.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='167x167'
          href='./images/apple-touch-icon-167x167.png'
        />
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
