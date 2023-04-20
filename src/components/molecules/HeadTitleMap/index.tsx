import Image from 'next/image'
import React from 'react'
import { css } from '@emotion/react'

export const HeadTitleMap = () => {
  return (
    <>
      <header css={mapHeader}>
        <Image
          src='/images/map_logo.png'
          width={72}
          height={38}
          alt='LunchMaps'
        ></Image>
      </header>
    </>
  )
}

const mapHeader = css`
  height: 50px;
  background: var(--color-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
`
