import Link from "next/link"
import React from "react"
import { css } from "@emotion/react"

const Nav = css`
  width: 100%;
  height: 90px;
  position: absolute;
  background: #ff9042;
  bottom: 0;
  z-index: 1;
  ul {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 100%;
    li {
      width: 25%;
      text-align: center;
      font-size: var(--font-size-small);
    }
  }
`

export const Navigation = () => {
  return (
    <>
      <nav css={Nav}>
        <ul>
          <li>
            <Link href="#">HOME</Link>
          </li>
          <li>
            <Link href="#">お気に入り</Link>
          </li>
          <li>
            <Link href="#">設定</Link>
          </li>
          <li>
            <Link href="#">ログアウト</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
