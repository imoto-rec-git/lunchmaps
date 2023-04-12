import Head from 'next/head';
import { css } from '@emotion/react';
import { NavigationTest } from '@/components/organisms/NavigationTest';
import { useContext } from 'react';
import { IsAuthContext } from './providers/IsAuthProvider';
import { useRouter } from 'next/router';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';

export default function Test() {
  // const { isAuth, setIsAuth } = useContext(IsAuthContext);
  // const router = useRouter();
  // const loginWithGoogle = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then((res) => {
  //       console.log(isAuth);

  //       setIsAuth(true);
  //       router.push('/test');
  //     })
  //     .catch((error) => console.log(error));
  // };
  // const logout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       setIsAuth(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <>
      <Head>
        <title>test | Lunch Maps</title>
        <meta name="description" content="Lunch MapsのHome画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div css={container}>
          <h1>ログイン</h1>
          {/* {isAuth ? (
            <button onClick={logout}>ログアウト</button>
          ) : (
            <button onClick={loginWithGoogle}>Googleログイン</button>
          )} */}
        </div>
        <NavigationTest />
      </main>
    </>
  );
}

const container = css`
  height: 100vh;
  background: white;
`;
