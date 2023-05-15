import { useState } from 'react'
import { Navigation } from '@/components/organisms/Navigation'
import { HeadTitle } from '@/components/molecules/HeadTitle'
import { css } from '@emotion/react'
import { ShopDetail } from '@/components/molecules/ShopDetail'
import { UserFavoriteList } from '@/components/molecules/UserFavoriteList'
import { HeadMeta } from '@/components/organisms/HeadMeta'
import { useFavoriteFetchData } from '@/hooks/useFavoriteFetchData'
import { useLoadCheck } from '@/hooks/useLoadCheck'
import { DocumentData } from 'firebase/firestore'

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
    rating: number
    user_ratings_total: number
    vicinity: string
  }

  const [userFavShpoList, setUserFavShopList] = useState<DocumentData[]>([])
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
    rating: 0,
    user_ratings_total: 0,
    vicinity: '',
  })
  const [active, setActive] = useState<string>('')
  useLoadCheck()
  useFavoriteFetchData({ setUserFavShopList })
  return (
    <>
      <HeadMeta
        title={'お気に入り | LunchMaps'}
        description={'Lunch Mapsのお気に入りページです。'}
      />
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
