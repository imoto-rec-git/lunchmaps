import Image from 'next/image'
import React from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { useFavoriteDetail } from '@/hooks/useFavoriteDetail'
import { useFavoriteDelete } from '@/hooks/useFavoriteDelete'

export const UserFavoriteList = ({
  userFavShpoList,
  setFavoriteShopInfo,
  setActive,
}) => {
  const router = useRouter()
  const { handleFavoriteDetail } = useFavoriteDetail({
    setFavoriteShopInfo,
    setActive,
  })
  const { handleFavoriteDelete } = useFavoriteDelete({ router })
  return (
    <ul css={favList}>
      {userFavShpoList.map((shop) => (
        <li key={shop.name} css={favItem}>
          <div css={favShopImg}>
            <Image
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${shop.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
              width={53}
              height={53}
              alt={shop.name}
            />
          </div>
          <div css={favShopDetail}>
            {shop.opening_hours.open_now ? (
              <span>営業中</span>
            ) : (
              <span>営業時間外</span>
            )}
            <p onClick={() => handleFavoriteDetail(shop.place_id)}>
              {shop.name}
            </p>
          </div>
          <div
            css={favShopDel}
            onClick={() => handleFavoriteDelete(shop.place_id)}
          >
            <p>削除</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

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
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-normal);
  cursor: pointer;
  > span {
    font-size: var(--font-size-small);
    text-decoration: none;
  }
  > p {
    font-size: var(--font-size-medium);
    text-decoration: underline;
  }
`
const favShopDel = css`
  border-left: 1px solid #ececec;
  padding: 8px;
  margin: -12px -12px -12px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
