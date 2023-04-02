import React from "react"
import { css } from "@emotion/react"
import Image from "next/image"
import Link from "next/link"

const Nav = css`
  width: 100%;
  height: 70px;
  position: absolute;
  background: var(--color-orange);
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
      a {
        img {
          margin: 0 auto;
          width: 26px;
          height: 26px;
        }
        span {
          font-size: 10px;
          line-height: 1;
        }
      }
    }
  }
`

export const Navigation = () => {
  return (
    <>
      <nav css={Nav}>
        <ul>
          <li>
            <Link href="./">
              <Image src="./images/home.svg" width={26} height={26} alt={""} />
              <span>HOME</span>
            </Link>
          </li>
          <li>
            <Link href="./favorite">
              <Image src="./images/heart.svg" width={26} height={26} alt={""} />
              <span>お気に入り</span>
            </Link>
          </li>
          <li>
            <Link href="./setting">
              <Image src="./images/gear.svg" width={26} height={26} alt={""} />
              <span>設定</span>
            </Link>
          </li>
          <li>
            <Link href="./login">
              <Image
                src="./images/loginout.svg"
                width={26}
                height={26}
                alt={""}
              />
              <span>ログアウト</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
