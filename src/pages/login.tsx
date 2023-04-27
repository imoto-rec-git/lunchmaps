import React, { useContext, useEffect } from 'react'
import { css } from '@emotion/react'
import { HeadTitle } from '@/components/molecules/HeadTitle'
import { Navigation } from '@/components/organisms/Navigation'
import { FirstLoadingContext } from '@/providers/IsFirstLoadingProvider'
import { HeadMeta } from '@/components/organisms/HeadMeta'
import { LoginContent } from '@/components/molecules/LoginContent'

export default function Login() {
  const { setIsFirstLoading } = useContext(FirstLoadingContext)
  useEffect(() => {
    setIsFirstLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HeadMeta
        title={'ログイン | LunchMaps'}
        description={'Lunch Mapsのログインページです。'}
      />
      <main>
        <HeadTitle link={'./'} title={'ログイン'} />
        <section>
          <div css={container}>
            <LoginContent />
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
