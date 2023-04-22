import React, { useContext, useEffect } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'
import { IsAuthContext } from '@/providers/IsAuthProvider'
import { useRouter } from 'next/router'
import { signOut } from 'firebase/auth'
import { auth } from '../../../../firebase'

export const Navigation = () => {
  const { isAuth, setIsAuth } = useContext(IsAuthContext)
  const router = useRouter()
  const handleLogoutDialogOpen = () => {
    const logoutModal: HTMLDialogElement = document.querySelector('#logout')
    logoutModal.showModal()
  }
  const handleLogoutDialogClose = () => {
    const logoutModal: HTMLDialogElement = document.querySelector('#logout')
    logoutModal.close()
  }
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false)
        router.reload()
      })
      .catch((error) => console.log(error))
    handleLogoutDialogClose()
  }
  const loginAlert = () => {
    alert('ログインすることで、ご利用できます。')
  }

  return (
    <>
      <dialog id='logout' css={favShopDelDialog}>
        <p>ログアウトしますか？</p>
        <div>
          <button onClick={handleLogout}>はい</button>
          <button onClick={handleLogoutDialogClose}>いいえ</button>
        </div>
      </dialog>
      <nav css={Nav}>
        <ul>
          <li>
            <Link href='./'>
              {router.pathname === '/' ? (
                <Image
                  src='./images/nav_map_current.svg'
                  width={26}
                  height={26}
                  alt={''}
                />
              ) : (
                <Image
                  src='./images/nav_map.svg'
                  width={26}
                  height={26}
                  alt={''}
                />
              )}
              <span
                className={router.pathname === '/' ? 'current' : 'noneCurrent'}
              >
                MAP
              </span>
            </Link>
          </li>
          <li>
            {isAuth ? (
              <>
                <Link href='./favorite'>
                  {router.pathname === '/favorite' ? (
                    <Image
                      src='./images/nav_star_current.svg'
                      width={26}
                      height={26}
                      alt={''}
                    />
                  ) : (
                    <Image
                      src='./images/nav_star.svg'
                      width={26}
                      height={26}
                      alt={''}
                    />
                  )}
                  <span
                    className={
                      router.pathname === '/favorite'
                        ? 'current'
                        : 'noneCurrent'
                    }
                  >
                    お気に入り
                  </span>
                </Link>
              </>
            ) : (
              <>
                <span css={grayScale} onClick={loginAlert}>
                  <Image
                    src='./images/nav_star_logout.svg'
                    width={26}
                    height={26}
                    alt={''}
                  />
                  <span>お気に入り</span>
                </span>
              </>
            )}
          </li>
          <li>
            {isAuth ? (
              <>
                <Link href='./setting'>
                  {router.pathname === '/setting' ? (
                    <Image
                      src='./images/nav_gear_current.svg'
                      width={26}
                      height={26}
                      alt={''}
                    />
                  ) : (
                    <Image
                      src='./images/nav_gear.svg'
                      width={26}
                      height={26}
                      alt={''}
                    />
                  )}
                  <span
                    className={
                      router.pathname === '/setting' ? 'current' : 'noneCurrent'
                    }
                  >
                    設定
                  </span>
                </Link>
              </>
            ) : (
              <>
                <span css={grayScale} onClick={loginAlert}>
                  <Image
                    src='./images/nav_gear_logout.svg'
                    width={26}
                    height={26}
                    alt={''}
                  />
                  <span>設定</span>
                </span>
              </>
            )}
          </li>
          <li>
            {isAuth ? (
              <>
                <span css={logout} onClick={handleLogoutDialogOpen}>
                  <Image
                    src='./images/nav_loginout.svg'
                    width={26}
                    height={26}
                    alt={''}
                  />
                  <span>ログアウト</span>
                </span>
              </>
            ) : (
              <>
                <Link href='./login'>
                  {router.pathname === '/login' ? (
                    <Image
                      src='./images/nav_loginout_current.svg'
                      width={26}
                      height={26}
                      alt={''}
                    />
                  ) : (
                    <Image
                      src='./images/nav_loginout.svg'
                      width={26}
                      height={26}
                      alt={''}
                    />
                  )}
                  <span
                    className={
                      router.pathname === '/login' ? 'current' : 'noneCurrent'
                    }
                  >
                    ログイン
                  </span>
                </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  )
}

const Nav = css`
  width: 100%;
  height: 70px;
  position: sticky;
  background: var(--color-orange);
  bottom: 0;
  z-index: 3;
  ul {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 100%;
    li {
      width: 25%;
      text-align: center;
      > a,
      > span {
        cursor: pointer;
        img {
          margin: 0 auto;
          width: 26px;
          height: 26px;
        }
        > span {
          font-size: 10px;
          line-height: 1;
          &.current {
            color: var(--color-dark-orange);
          }
          &.noneCurrent {
            color: var(--color-white);
          }
        }
      }
    }
  }
`
const grayScale = css`
  > span {
    color: var(--color-gray);
  }
`
const logout = css`
  > span {
    color: var(--color-white);
  }
`

const favShopDelDialog = css`
  width: 280px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  padding: 14px;
  box-sizing: border-box;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  > p {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-regular);
    text-align: center;
    margin: 45px 0;
  }
  div {
    display: flex;
    > button {
      width: 113px;
      color: var(--color-white);
      border: none;
      border-radius: 60px;
      background: var(--color-dark-orange);
      font-size: var(--font-size-small);
      padding: 19px 0;
      line-height: 1;
      margin: auto;
      display: block;
      &:last-child {
        color: var(--color-black);
        background: var(--color-gray);
      }
    }
  }
`
