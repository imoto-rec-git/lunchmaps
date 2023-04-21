import Head from 'next/head'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { auth, db } from '../../firebase'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { useContext } from 'react'
import { PositionContext } from '@/providers/IsPositionProvider'

export default function Test() {
  const { positionLat } = useContext(PositionContext)
  const router = useRouter()
  const testFunc = async () => {
    // const docRef = doc(db, 'users', 'testId')
    // console.log('削除処理開始')
    // try {
    //   await updateDoc(docRef, {
    //     testField: arrayRemove('test1'),
    //   })
    //   console.log('削除完了')
    // } catch (err) {
    //   console.log(err)
    // }
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
