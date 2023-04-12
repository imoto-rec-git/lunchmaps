import React, { useContext } from 'react';
import Head from 'next/head';
import { css } from '@emotion/react';
import Link from 'next/link';
import { IsAuthContext } from './providers/IsAuthProvider';
import { useRouter } from 'next/router';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';

export default function login() {
  const { isAuth, setIsAuth } = useContext(IsAuthContext);
  const router = useRouter();
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        console.log(isAuth);
        setIsAuth(true);
        router.push('/');
      })
      .catch((error) => console.log(error));
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        router.push('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Head>
        <title>ログイン | Lunch Maps</title>
        <meta name="description" content="Lunch Mapsのログイン画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <div css={Container}>
            <div css={loginContents}>
              <p>かんたんログイン</p>
              {isAuth ? (
                <button css={gooleButton} onClick={logout}>
                  ログアウト
                </button>
              ) : (
                <>
                  <button css={gooleButton} onClick={loginWithGoogle}>
                    Googleで続ける
                  </button>
                  <p>または</p>
                  {/* <Link href="./register" css={otherButton}>
                                メール/パスワードを入力してログイン{' '}
                                <span>（既に会員登録がお済みの方）</span>
                              </Link> */}
                  <Link href="./" css={otherButton}>
                    ログインしない<span>※一部機能が使用できません</span>
                  </Link>
                </>
              )}
            </div>
            {/* <Link href="./" css={registration}>
              新規会員登録はこちら
            </Link> */}
          </div>
        </section>
      </main>
    </>
  );
}

const Container = css`
  height: 100vh;
  background: #ff9042;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
const loginContents = css`
  text-align: center;
  p {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-bold);
    color: var(--color-white);
    text-align: center;
    margin: 0 0 12px;
  }
`;
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
`;
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
`;
// const registration = css`
//   color: var(--color-white);
//   font-size: var(--font-size-medium);
//   font-weight: var(--font-weight-medium);
//   position: absolute;
//   bottom: 20px;
//   text-decoration: underline;
// `;
