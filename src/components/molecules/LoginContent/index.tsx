import React, { useContext } from 'react'
import Link from 'next/link'
import { IsAuthContext } from '@/providers/IsAuthProvider'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'

export const LoginContent = () => {
  const router = useRouter()
  const { setIsAuth } = useContext(IsAuthContext)
  const { loginWithGoogle } = useGoogleAuth({ setIsAuth, router })
  return (
    <div css={loginContents}>
      <button css={gooleButton} onClick={loginWithGoogle}>
        Googleでログイン
      </button>
      <p>または</p>
      <Link href="./" css={otherButton}>
        ログインしない<span>※一部機能が使用できません</span>
      </Link>
    </div>
  )
}

const loginContents = css`
  text-align: center;
  p {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-bold);
    color: var(--color-black);
    text-align: center;
    margin: 0 0 12px;
  }
`
const gooleButton = css`
  width: 280px;
  background-color: var(--color-white);
  border: 1px solid #e7e7e7;
  border-radius: 40px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    width: 23px;
    height: 23px;
    content: '';
    background-image: url('./images/google.svg');
    background-repeat: no-repeat;
    background-size: 23px 23px;
    display: inline-block;
    margin: 0 8px 0 0;
  }
`
const otherButton = css`
  width: 280px;
  background: var(--color-white);
  border: 1px solid #e7e7e7;
  border-radius: 40px;
  padding: 5px 0;
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-medium);
  margin: 0 auto 12px;
  color: var(--color-black);
  display: block;
  span {
    display: block;
    font-size: 10px;
  }
`
