import React, { useState } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import { useAreaSearch } from '@/hooks/useAreaSearch'

export const TextBox = ({ setLat, setLng }) => {
  const [areaSearch, setAreaSearch] = useState('')
  const { handleAreaSearch, handleAreaSubmit } = useAreaSearch({
    areaSearch,
    setAreaSearch,
    setLat,
    setLng,
  })
  return (
    <>
      <div css={TextBoxStyle}>
        <form onSubmit={handleAreaSubmit}>
          <input
            type="text"
            value={areaSearch}
            placeholder="エリア検索（例：大阪市中央区、本町駅など）"
            onChange={handleAreaSearch}
          />
          <button type="submit">
            <Image src="./images/search.svg" width={25} height={25} alt="" />
          </button>
        </form>
      </div>
    </>
  )
}

const TextBoxStyle = css`
  form {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 80px;
    z-index: 1;
    width: calc(100% - 20px);
    display: flex;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  input {
    width: calc(100% - 55px);
    border-top: 3px solid var(--color-dark-orange);
    border-left: 3px solid var(--color-dark-orange);
    border-bottom: 3px solid var(--color-dark-orange);
    border-right: none;
    background: var(--color-white);
    border-radius: 24px 0 0 24px;
    padding: 9px 18px;
    ::placeholder {
      font-size: 12px;
      color: #d2d2d2;
    }
  }

  button {
    color: var(--color-white);
    width: 55px;
    border: none;
    border-radius: 0 24px 24px 0;
    background: var(--color-dark-orange);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
