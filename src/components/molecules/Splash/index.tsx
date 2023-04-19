import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { css } from '@emotion/react'
import { FirstLoadingContext } from '../../../providers/IsFirstLoadingProvider'

export const Splash = () => {
  const { isfirstLoading, setIsFirstLoading } = useContext(FirstLoadingContext)
  const [Load, setLoad] = useState('load')
  useEffect(() => {
    if (isfirstLoading) {
      setTimeout(() => {
        setLoad('loaded')
      }, 3000)
      setTimeout(() => {
        setLoad('loadNone')
      }, 3800)
      setIsFirstLoading(false)
    } else {
      setLoad('loadNone')
      setIsFirstLoading(false)
    }
  }, [])
  return (
    <>
      <section css={splashSection} className={Load}>
        <div css={splashContainer}>
          <p>
            <Image
              src="./images/logo.svg"
              width={72}
              height={74}
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
