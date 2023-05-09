import { css } from '@emotion/react'
import { HeadTitle } from '@/components/molecules/HeadTitle'
import { Navigation } from '@/components/organisms/Navigation'
import { HeadMeta } from '@/components/organisms/HeadMeta'
import { LoginContent } from '@/components/molecules/LoginContent'
import { useLoadCheck } from '@/hooks/useLoadCheck'

export default function Login() {
  useLoadCheck()
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
