import { Dispatch, SetStateAction, useContext } from 'react'
import Image from 'next/image'
import { css } from '@emotion/react'
import { FirstLoadingContext } from '../../../providers/IsFirstLoadingProvider'
import { useLoad } from '@/hooks/useLoad'

interface setIsFirstLoading {
  isfirstLoading: boolean
  setIsFirstLoading: Dispatch<SetStateAction<boolean>>
}

export const Splash = () => {
  const { isfirstLoading, setIsFirstLoading } = useContext(
    FirstLoadingContext
  ) as setIsFirstLoading
  const { Load } = useLoad({ isfirstLoading, setIsFirstLoading })

  return (
    <>
      <section css={splashSection} className={Load}>
        <div css={splashContainer}>
          <p>
            <Image
              src="/images/splash_logo.png"
              width={120}
              height={97}
              alt="LunchMaps"
            />
          </p>
        </div>
      </section>
    </>
  )
}
const splashSection = css`
  position: absolute;
  width: 100%;
  height: 100vh;
  height: 100svh;
  z-index: 4;
`
const splashContainer = css`
  background: var(--color-orange);
  height: 100vh;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 100;
`
