import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Navigation } from '@/components/organisms/Navigation'
import { HeadTitle } from '@/components/molecules/HeadTitle'
import { css } from '@emotion/react'
import Image from 'next/image'
import { ShopDetail } from '@/components/molecules/ShopDetail'
import { auth, db } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export default function favorite() {
  const [user, setUser] = useState(null)
  const [shopName, setShopName] = useState('')
  const [userFavShpoList, setUserFavShopList] = useState([])
  const [active, setActive] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        fetchData(user)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async (user) => {
    // fireStore読み込み
    const userFavListData = async () => {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const fetchedData = []
        for (let i = 0; i < docSnap.data().favoriteList.length; i++) {
          const res = await fetch(
            `/api/details?place_id=${docSnap.data().favoriteList[i]}`
          )
          const data = await res.json()
          fetchedData.push(data.result)
        }
        setUserFavShopList(fetchedData)
      } else {
        console.log('No such document!')
      }
    }
    userFavListData()
  }

  const handleFavShopDetail = () => {
    setActive('active')
  }
  const handleDeleteFav = (data: string) => {
    console.log('削除')
    console.log(data)
  }
  // const handleDialogOpen = () => {
  //   const modal = document.querySelector('dialog');
  //   modal.showModal();
  // };
  // const handleDialogClose = () => {
  //   const modal = document.querySelector('dialog');
  //   modal.close();
  // };

  return (
    <>
      <Head>
        <title>お気に入り | Lunch Maps</title>
        <meta name="description" content="Lunch Mapsのお気に入り画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeadTitle link={'./'} title={'お気に入り'} />
        <div css={conatiner}>
          {userFavShpoList && (
            <>
              <p>全{userFavShpoList.length}件</p>
              <ul css={favList}>
                {userFavShpoList.map((shop) => (
                  <li key={shop.name} css={favItem}>
                    <div css={favShopImg}>
                      <Image
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${shop.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                        width={50}
                        height={50}
                        alt={shop.name}
                      />
                    </div>
                    <div css={favShopDetail}>
                      <p onClick={handleFavShopDetail}>{shop.name}</p>
                    </div>
                    <div
                      css={favShopDel}
                      onClick={() => handleDeleteFav(shop.name)}
                    >
                      <p>削除</p>
                    </div>
                  </li>
                ))}
              </ul>
              <ShopDetail
                placeId={''}
                setActive={setActive}
                active={active}
                shopPhoto={''}
                shopName={''}
                shopRating={''}
                shopRatingTotal={''}
                shopOpen={''}
                shopBusinessHours={''}
                shopAddress={''}
              />
              {/* <dialog css={favShopDelDialog}>
                <p>「」をお気に入りから削除しますか？</p>
                <div>
                  <button onClick={handleDialogClose}>はい</button>
                  <button onClick={handleDialogClose}>いいえ</button>
                </div>
              </dialog> */}
            </>
          )}
        </div>
        <Navigation />
      </main>
    </>
  )
}
const conatiner = css`
  min-height: calc(100vh - 120px);
  background: var(--color-dark-white);
  padding: 8px 14px;
  > p {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-regular);
    text-align: center;
    margin: 0 0 8px;
  }
`
const favList = css``
const favItem = css`
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  background: var(--color-white);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 8px;
  margin: 0 0 10px;
`
const favShopImg = css`
  > img {
    width: 53px;
    height: 53px;
    border-radius: 4px;
    object-fit: cover;
  }
`
const favShopDetail = css`
  width: calc(100% - 103px);
  display: flex;
  align-items: center;
  text-decoration: underline;
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-normal);
`
const favShopDel = css`
  border-left: 1px solid #ececec;
  padding: 8px;
  margin: -12px -12px -12px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > p {
    font-size: 11px;
    font-weight: var(--font-weight-light);
    &::before {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      background: url('./images/close.svg');
      margin: 0 auto 4px;
    }
  }
`
const favShopDelDialog = css`
  width: 280px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  padding: 14px;
  box-sizing: border-box;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  > p {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-regular);
    text-align: center;
    margin: 45px 0;
  }
  div {
    display: flex;
    > button {
      width: 113px;
      color: var(--color-white);
      border: none;
      border-radius: 60px;
      background: var(--color-dark-orange);
      font-size: var(--font-size-small);
      padding: 19px 0;
      line-height: 1;
      margin: auto;
      display: block;
      &:last-child {
        color: var(--color-black);
        background: var(--color-gray);
      }
    }
  }
`
