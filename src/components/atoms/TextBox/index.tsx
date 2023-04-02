import React from "react"
import { css } from "@emotion/react"
import Image from "next/image"

const TextBoxStyle = css`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 80px;
  z-index: 1;
  width: calc(100% - 20px);
  display: flex;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  input {
    width: 100%;
    border-top: 3px solid var(--color-dark-orange);
    border-left: 3px solid var(--color-dark-orange);
    border-bottom: 3px solid var(--color-dark-orange);
    border-right: none;
    background: var(--color-white);
    border-radius: 24px 0 0 24px;
    padding: 9px 18px;
  }
  button {
    color: var(--color-white);
    width: 55px;
    border: none;
    border-radius: 0 24px 24px 0;
    background: var(--color-dark-orange);
    img {
      margin: auto;
    }
  }
`

export const TextBox = () => {
  return (
    <>
      <div css={TextBoxStyle}>
        <input type="text" name="" placeholder="例：本町駅" />
        <button>
          <Image src="./images/search.svg" width={25} height={25} alt="" />
        </button>
      </div>
    </>
  )
}
