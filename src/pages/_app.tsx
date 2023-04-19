import '@/styles/globals.css'
import '@/styles/reset.css'
import type { AppProps } from 'next/app'
import { IsAuthProvider } from '../providers/IsAuthProvider'
import { FirstLoadingProvider } from '@/providers/IsFirstLoadingProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <IsAuthProvider>
        <FirstLoadingProvider>
          <Component {...pageProps} />
        </FirstLoadingProvider>
      </IsAuthProvider>
    </>
  )
}
