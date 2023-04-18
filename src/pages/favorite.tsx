import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Navigation } from '@/components/organisms/Navigation'
import { HeadTitle } from '@/components/molecules/HeadTitle'
import { css } from '@emotion/react'
import Image from 'next/image'
import { ShopDetail } from '@/components/molecules/ShopDetail'
import { auth, db } from '../../firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'

export default function favorite() {
  interface Data {
    name: string
    opening_hours: {
      open_now: boolean
      weekday_text: string[]
    }
    photos: {
      0: {
        photo_reference: string
      }
    }
    place_id: string
    rating: string
    user_ratings_total: string
    vicinity: string
  }
  const [user, setUser] = useState(null)
  const [userFavShpoList, setUserFavShopList] = useState([])
  const [favoriteShopInfo, setFavoriteShopInfo] = useState<Data>({
    name: '',
    opening_hours: {
      open_now: false,
      weekday_text: [],
    },
    photos: {
      0: {
        photo_reference: '',
      },
    },
    place_id: '',
    rating: '',
    user_ratings_total: '',
    vicinity: '',
  })
  const [active, setActive] = useState(null)
  const router = useRouter()
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

  const fetchData = async (user: User) => {
    // fireStore読み込み
    const userFavListData = async () => {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists() && docSnap.data().favoriteList) {
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

  const handleFavShopDetail = async () => {
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists() && docSnap.data().favoriteList) {
      const favoriteId = docSnap.data().favoriteList
      const res = await fetch(`/api/details?place_id=${favoriteId}`)
      const data = await res.json()
      setFavoriteShopInfo(data.result)
      setActive('active')
    } else {
      setActive('')
    }
  }
  const handleDeleteFav = async (placeId: string) => {
    // firestoreの特定の要素削除
    const docRef = doc(db, 'users', auth.currentUser.uid)
    try {
      await updateDoc(docRef, {
        favoriteList: arrayRemove(placeId),
      })
      router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>お気に入り | Lunch Maps</title>
        <meta name='description' content='Lunch Mapsのお気に入り画面' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
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
                      onClick={() => handleDeleteFav(shop.place_id)}
                    >
                      <p>削除</p>
                    </div>
                  </li>
                ))}
              </ul>
              <ShopDetail
                placeId={favoriteShopInfo.place_id}
                setActive={setActive}
                active={active}
                shopPhoto={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${favoriteShopInfo.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                shopName={favoriteShopInfo.name}
                shopRating={favoriteShopInfo.rating}
                shopRatingTotal={favoriteShopInfo.user_ratings_total}
                shopOpen={favoriteShopInfo.opening_hours.open_now}
                shopBusinessHours={favoriteShopInfo.opening_hours.weekday_text}
                shopAddress={favoriteShopInfo.vicinity}
                state={false}
              />
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
