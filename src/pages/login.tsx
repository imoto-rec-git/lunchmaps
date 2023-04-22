import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import { css } from '@emotion/react'
import Link from 'next/link'
import { IsAuthContext } from '../providers/IsAuthProvider'
import { useRouter } from 'next/router'
import { auth, db, googleProvider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { HeadTitle } from '@/components/molecules/HeadTitle'
import { Navigation } from '@/components/organisms/Navigation'
import { FirstLoadingContext } from '@/providers/IsFirstLoadingProvider'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function Login() {
  const { setIsFirstLoading } = useContext(FirstLoadingContext)
  const { isAuth, setIsAuth } = useContext(IsAuthContext)
  const router = useRouter()
  useEffect(() => {
    setIsFirstLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        const uid = auth.currentUser.uid
        console.log(`Logged in as ${uid}`)
        const docRef = doc(db, `users/${uid}`)
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              console.log('このドキュメントIDはすでに存在しています。')
              setIsAuth(true)
              router.push('/')
            } else {
              console.log('ドキュメントIDを新規です。')
              setDoc(docRef, {
                favoriteList: [],
              })
                .then(() => {
                  setIsAuth(true)
                  router.push('/')
                })
                .catch((error) => console.log(error))
            }
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <Head>
        <title>ログイン | Lunch Maps</title>
        <meta name='description' content='Lunch Mapsのログイン画面' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <HeadTitle link={'./'} title={'ログイン'} />
        <section>
          <div css={container}>
            <div css={loginContents}>
              <p>かんたんログイン</p>
              <button css={gooleButton} onClick={loginWithGoogle}>
                Googleで続ける
              </button>
              <p>または</p>
              <Link href='./' css={otherButton}>
                ログインしない<span>※一部機能が使用できません</span>
              </Link>
            </div>
          </div>
        </section>
        <Navigation />
      </main>
    </>
  )
}

const container = css`
  min-height: calc(100vh - 120px);
  background: var(--color-dark-white);
  padding: 14px 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`
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
