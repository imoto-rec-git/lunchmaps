import React from 'react'
import { css } from '@emotion/react'
import { signOut } from 'firebase/auth'
import { auth } from '../../../../firebase'

export const LogoutDialog = ({ setIsAuth, router }) => {
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
  return (
    <dialog id="logout" css={favShopDelDialog}>
      <p>ログアウトしますか？</p>
      <div>
        <button onClick={handleLogout}>はい</button>
        <button onClick={handleLogoutDialogClose}>いいえ</button>
      </div>
    </dialog>
  )
}

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
