import Head from 'next/head'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { auth, db } from '../../firebase'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { useContext } from 'react'
import { PositionContext } from '@/providers/IsPositionProvider'

export default function Test() {
  const { positionLat } = useContext(PositionContext)
  const router = useRouter()
  const testFunc = async () => {
    try {
      const docId = auth.currentUser.uid
      const docRef = doc(db, `users/${docId}`)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log('このドキュメントIDはすでに存在しています。')
      } else {
        await setDoc(docRef, {
          favoriteList: [],
        })
        console.log('ドキュメントIDを追加しました。')
      }
    } catch (e) {
      console.log('Error', e)
    }
  }
  return (
    <>
      <Head>
        <title>test | Lunch Maps</title>
        <meta name='description' content='Lunch MapsのHome画面' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div css={container}>
          <button onClick={testFunc}>ボタン</button>
        </div>
      </main>
    </>
  )
}

const container = css`
  height: 100vh;
  background: white;
`
