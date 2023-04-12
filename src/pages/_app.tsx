import '@/styles/globals.css';
import '@/styles/reset.css';
import type { AppProps } from 'next/app';
import { IsAuthProvider } from './providers/IsAuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <IsAuthProvider>
        <Component {...pageProps} />;
      </IsAuthProvider>
    </>
  );
}
