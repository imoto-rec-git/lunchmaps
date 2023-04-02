import React from "react"
import { css } from "@emotion/react"
import { LocateButton } from "@/components/atoms/LocateButton"
import { TextBox } from "@/components/atoms/TextBox"
import { Map } from "@/components/molecules/Map"

const maps = css`
  background: var(--color-white);
  height: calc(100vh - 70px);
`

export const Homes = () => {
  return (
    <>
      <section>
        <div css={maps}>
          <Map />
          <LocateButton />
          <TextBox />
        </div>
      </section>
    </>
  )
}
