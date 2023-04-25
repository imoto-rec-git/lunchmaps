import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { Navigation } from '@/components/organisms/Navigation'
import { HeadTitle } from '@/components/molecules/HeadTitle'
import { css } from '@emotion/react'
import { ShopDetail } from '@/components/molecules/ShopDetail'
import { auth, db } from '../../firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { FirstLoadingContext } from '@/providers/IsFirstLoadingProvider'
import { UserFavoriteList } from '@/components/molecules/UserFavoriteList'

export default function Favorite() {
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
  const { setIsFirstLoading } = useContext(FirstLoadingContext)
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
  useEffect(() => {
    setIsFirstLoading(false)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        fetchData(user)
      }
    })
    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  return (
    <>
      <Head>
        <title>お気に入り | Lunch Maps</title>
        <meta name='description' content='Lunch Mapsのお気に入り画面' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='./images/apple-touch-icon-180x180.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='167x167'
          href='./images/apple-touch-icon-167x167.png'
        />
      </Head>
      <main>
        <HeadTitle link={'./'} title={'お気に入り'} />
        <div css={conatiner}>
          {userFavShpoList && (
            <>
              <p>全{userFavShpoList.length}件</p>
              <UserFavoriteList
                userFavShpoList={userFavShpoList}
                setFavoriteShopInfo={setFavoriteShopInfo}
                setActive={setActive}
              />
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
