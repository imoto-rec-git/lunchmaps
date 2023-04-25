import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { Navigation } from '@/components/organisms/Navigation'
import { HeadTitle } from '@/components/molecules/HeadTitle'
import { css } from '@emotion/react'
import { auth } from '../../firebase'
import { FirstLoadingContext } from '@/providers/IsFirstLoadingProvider'
import { Mail } from '@/components/molecules/Mail'
import { PassWord } from '@/components/molecules/PassWord'

export default function Setting() {
  const { setIsFirstLoading } = useContext(FirstLoadingContext)
  const [userEmail, setUserEmail] = useState('')
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false)
  useEffect(() => {
    setIsFirstLoading(false)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email)
        setIsGoogleSignIn(user.providerData[0].providerId === 'google.com')
      } else {
        setUserEmail('')
      }
    })
    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Head>
        <title>設定 | Lunch Maps</title>
        <meta name='description' content='Lunch Mapsの設定画面' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='./images/apple-touch-icon-180x180.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='167x167'
          href='./images/apple-touch-icon-167x167.png'
        />
      </Head>
      <main>
        <HeadTitle link={'./'} title={'設定'} />
        <div css={conatiner}>
          <Mail
            settingWrapper={settingWrapper}
            settingTitle={settingTitle}
            settingContent={settingContent}
            userEmail={userEmail}
            isGoogleSignIn={isGoogleSignIn}
            settingChange={settingChange}
          />
          <PassWord
            isGoogleSignIn={isGoogleSignIn}
            settingWrapper={settingWrapper}
            settingTitle={settingTitle}
            settingContent={settingContent}
            settingChange={settingChange}
          />
        </div>
        <Navigation />
      </main>
    </>
  )
}

const conatiner = css`
  min-height: calc(100vh - 120px);
  background: var(--color-dark-white);
  padding: 14px 0;
  position: relative;
  > p {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-regular);
    text-align: center;
    margin: 0 0 8px;
  }
`

const settingWrapper = css`
  width: 100%;
  padding: 16px 14px;
  background: var(--color-white);
  display: flex;
  align-items: center;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
  color: #999;
  border-top: 1px solid var(--color-light-gray);
  border-bottom: 1px solid var(--color-light-gray);
  &:nth-of-type(n + 2) {
    margin: -1px 0 0;
  }
`
const settingTitle = css`
  width: 84px;
  margin: 0 12px 0 0;
`
const settingContent = css`
  font-size: var(--font-size-medium);
  color: #333;
`
const settingChange = css`
  margin: 0 0 0 auto;
`
