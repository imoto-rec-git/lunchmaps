import { Splash } from '@/components/molecules/Splash'
import { Navigation } from '@/components/organisms/Navigation'
import { Homes } from '@/components/organisms/Home'
import { HeadTitleMap } from '@/components/molecules/HeadTitleMap'
import { HeadMeta } from '@/components/organisms/HeadMeta'

export default function Home() {
  return (
    <>
      <HeadMeta
        title={'LunchMaps'}
        description={'LunchMapsのマップページです。'}
      />
      <HeadTitleMap />
      <main>
        <Splash />
        <Homes />
        <Navigation />
        saaaa
      </main>
    </>
  )
}
