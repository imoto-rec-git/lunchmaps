import '@/styles/globals.css'
import '@/styles/reset.css'
import type { AppProps } from 'next/app'
import { IsAuthProvider } from '../providers/IsAuthProvider'
import { FirstLoadingProvider } from '@/providers/IsFirstLoadingProvider'
import { IsPositionProvider } from '@/providers/IsPositionProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <IsAuthProvider>
        <FirstLoadingProvider>
          <IsPositionProvider>
            <Component {...pageProps} />
          </IsPositionProvider>
        </FirstLoadingProvider>
      </IsAuthProvider>
    </>
  )
}
