import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IsAuthContext } from '@/providers/IsAuthProvider'
import { useFavoriteAdd } from '@/hooks/useFavoriteAdd'
import { useBackSwipe } from '@/hooks/useBackSwipe'
import { useUnsetActive } from '@/hooks/useUnsetActive'
import { useFavoriteData } from '@/hooks/useFavoriteData'
import { DocumentData } from 'firebase/firestore'

interface isAuthProps {
  isAuth: boolean
}

export const ShopDetail = ({
  placeId,
  setActive,
  active,
  shopPhoto,
  shopName,
  shopRating,
  shopRatingTotal,
  shopOpen,
  shopBusinessHours,
  shopAddress,
  state,
}: {
  placeId: string
  setActive: Dispatch<SetStateAction<string>>
  active: string
  shopPhoto: string
  shopName: string
  shopRating: number
  shopRatingTotal: number
  shopOpen: boolean | string
  shopBusinessHours: string[]
  shopAddress: string
  state: boolean
}) => {
  const router = useRouter()
  const { isAuth } = useContext(IsAuthContext) as isAuthProps
  const [favState, setFavState] = useState(false)
  const [favList, setFavList] = useState<DocumentData[]>([])
  useFavoriteData({ placeId, setFavState, favList })
  const { handleReturn } = useUnsetActive({ setActive })
  const { handleBackSwipe } = useBackSwipe({ setActive })
  const { handleFavoritAdd } = useFavoriteAdd({ setFavList, router, placeId })

  return (
    <>
      <div
        css={shopDetailStyle}
        className={active && 'active'}
        {...handleBackSwipe}
      >
        {shopPhoto && (
          <div css={shopDetailImg}>
            <Image src={shopPhoto} width={400} height={400} alt="" />
          </div>
        )}
        <div css={shopDetailTxt}>
          {shopName && <h3>{shopName}</h3>}
          {shopRating && (
            <p css={shopDetailRate}>
              {shopRating}
              <span css={shopDetailRateDesign} data-rate={shopRating}></span>（
              {shopRatingTotal}）
            </p>
          )}
          {shopOpen ? (
            <p css={shopDetailOpen}>営業中</p>
          ) : (
            <p css={shopDetailOpen}>営業時間外</p>
          )}
          {shopBusinessHours && (
            <ul css={shopDetailBusinessHours}>
              {shopBusinessHours.map((e, index) => {
                return <li key={index}>{e}</li>
              })}
            </ul>
          )}
          {shopAddress && <p css={shopDetailAddress}>{shopAddress}</p>}
          {state && isAuth && (
            <button
              css={favState ? favoriteButtonDisabled : favoriteButton}
              onClick={handleFavoritAdd}
              disabled={favState}
            >
              {favState ? 'お気に入り済' : 'お気に入り'}
            </button>
          )}
        </div>
        <button css={backButton} onClick={handleReturn}>
          <Image src="./images/arrow.svg" width={9} height={15} alt="" />
        </button>
      </div>
    </>
  )
}

const shopDetailStyle = css`
  max-width: 394px;
  width: calc(100% - 20px);
  margin: 0 0 70px;
  height: calc(100% - 70px);
  z-index: 2;
  position: absolute;
  top: 0;
  right: -100%;
  background: #fff;
  box-shadow: -4px 0px 12px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  transition: all 0.2s ease-out;
  h3 {
    font-size: 24px;
    font-weight: var(--font-weight-medium);
    margin: 0 0 4px;
  }
  a {
    color: var(--color-black);
    text-decoration: underline;
  }
`
const shopDetailImg = css`
  margin: 0 auto 12px;
  img {
    max-height: 200px;
    width: 100%;
    object-fit: cover;
  }
`
const shopDetailTxt = css`
  padding: 0 16px 30px;
`
const shopDetailRate = css`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-regular);
  margin: 0 0 14px 2px;
  line-height: 1;
`
const shopDetailRateDesign = css`
  position: relative;
  z-index: 0;
  display: inline-block;
  white-space: nowrap;
  color: var(--color-gray);
  margin: 0 0 0 8px;
  font-size: 16px;
  line-height: 1;
  &::before,
  &::after {
    content: '★★★★★';
  }
  &::after {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    overflow: hidden;
    white-space: nowrap;
    color: #ffcf32;
  }
  &[data-rate='5']::after {
    width: 100%;
  }
  &[data-rate='4.9']::after,
  &[data-rate='4.8']::after,
  &[data-rate='4.7']::after,
  &[data-rate='4.6']::after,
  &[data-rate='4.5']::after {
    width: 90%;
  }
  &[data-rate='4.4']::after,
  &[data-rate='4.3']::after,
  &[data-rate='4.2']::after,
  &[data-rate='4.1']::after,
  &[data-rate='4']::after {
    width: 80%;
  }
  &[data-rate='3.9']::after,
  &[data-rate='3.8']::after,
  &[data-rate='3.7']::after,
  &[data-rate='3.6']::after,
  &[data-rate='3.5']::after {
    width: 70%;
  }
  &[data-rate='3.4']::after,
  &[data-rate='3.3']::after,
  &[data-rate='3.2']::after,
  &[data-rate='3.1']::after,
  &[data-rate='3']::after {
    width: 60%;
  }
  &[data-rate='2.9']::after,
  &[data-rate='2.8']::after,
  &[data-rate='2.7']::after,
  &[data-rate='2.6']::after,
  &[data-rate='2.5']::after {
    width: 50%;
  }
  &[data-rate='2.4']::after,
  &[data-rate='2.3']::after,
  &[data-rate='2.2']::after,
  &[data-rate='2.1']::after,
  &[data-rate='2']::after {
    width: 40%;
  }
  &[data-rate='1.9']::after,
  &[data-rate='1.8']::after,
  &[data-rate='1.7']::after,
  &[data-rate='1.6']::after,
  &[data-rate='1.5']::after {
    width: 30%;
  }
  &[data-rate='1.4']::after,
  &[data-rate='1.3']::after,
  &[data-rate='1.2']::after,
  &[data-rate='1.1']::after,
  &[data-rate='1']::after {
    width: 20%;
  }
  &[data-rate='0.9']::after,
  &[data-rate='0.8']::after,
  &[data-rate='0.7']::after,
  &[data-rate='0.6']::after,
  &[data-rate='0.5']::after {
    width: 10%;
  }
  &[data-rate='0.4']::after,
  &[data-rate='0.3']::after,
  &[data-rate='0.2']::after,
  &[data-rate='0.1']::after,
  &[data-rate='0']::after {
    width: 0%;
  }
`
const shopDetailOpen = css`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
  margin: 0 0 4px;
  position: relative;
  padding: 0 0 0 24px;
  &::before {
    content: '';
    background-image: url(./images/time.svg);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    display: inline-block;
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 0;
    margin: auto;
  }
`
const shopDetailBusinessHours = css`
  margin: 0 0 14px 24px;
  li {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    text-indent: -44px;
    padding: 0 0 0 44px;
  }
`
const shopDetailAddress = css`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
  margin: 0 0 36px;
  position: relative;
  padding: 0 0 0 24px;
  &::before {
    content: '';
    background-image: url(./images/address.svg);
    background-repeat: no-repeat;
    background-size: 20px 25px;
    width: 20px;
    height: 25px;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
  }
`
const favoriteButton = css`
  margin: auto;
  width: auto;
  padding: 14px;
  border-radius: 26px;
  font-size: var(--font-size-small);
  color: var(--color-white);
  background: var(--color-dark-orange);
  border: none;
  display: flex;
  align-items: center;
  line-height: 1;
  justify-content: center;
  &::before {
    content: '';
    width: 24px;
    height: 22px;
    background-image: url('./images/nav_star.svg');
    background-size: 24px 22px;
    background-repeat: no-repeat;
    display: inline-block;
    margin: 0 8px 0 0;
  }
`
const favoriteButtonDisabled = css`
  margin: auto;
  width: auto;
  padding: 14px;
  border-radius: 26px;
  font-size: var(--font-size-small);
  color: var(--color-dark-gray);
  background: var(--color-gray);
  border: none;
  display: flex;
  align-items: center;
  line-height: 1;
  justify-content: center;
  &::before {
    content: '';
    width: 24px;
    height: 22px;
    background-image: url('./images/nav_star.svg');
    background-size: 24px 22px;
    background-repeat: no-repeat;
    display: inline-block;
    margin: 0 8px 0 0;
  }
`
const backButton = css`
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--color-dark-orange);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(178deg);
  img {
    width: 9px;
    height: auto;
  }
`
