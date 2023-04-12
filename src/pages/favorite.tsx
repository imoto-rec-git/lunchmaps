import React, { useState } from 'react';
import Head from 'next/head';
import { Navigation } from '@/components/organisms/Navigation';
import { HeadTitle } from '@/components/molecules/HeadTitle';
import { css } from '@emotion/react';
import Image from 'next/image';
import { ShopDetail } from '@/components/molecules/ShopDetail';

export default function favorite() {
  const [active, setActive] = useState('');
  const handleFavShopDetail = () => {
    setActive('active');
  };
  const handleDialogOpen = () => {
    const modal = document.querySelector('dialog');
    modal.showModal();
  };
  const handleDialogClose = () => {
    const modal = document.querySelector('dialog');
    modal.close();
  };
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
          <p>全5件</p>
          <ul css={favList}>
            <li css={favItem}>
              <div css={favShopImg}>
                <Image
                  src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AUjq9jl3XodICgx5RFrwcGc2_UpQKd1E0Lv-KhNjp1hs9VZmw4wwoUtg5kPZxwhvhLovX_IuEUOMgjhxFWLgKz-nG7HxOfBOuwasCgtH2YemqefZnH7C-2CRFhaVOlaraAZIHN7DiKi5rb5e4o6ZDnXPGC6eWZNue4_bh1crxNTHbCL6rQbG&key=AIzaSyALKPhTFJYoWODv6 U1RyCvHDKkNDl9_Z9k"
                  width={50}
                  height={50}
                  alt=""
                />
              </div>
              <div css={favShopDetail}>
                <p onClick={handleFavShopDetail}>CRITTERS BUEGER</p>
              </div>
              <div css={favShopDel} onClick={handleDialogOpen}>
                <p>削除</p>
              </div>
            </li>
          </ul>
        </div>
        <ShopDetail
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
        <dialog css={favShopDelDialog}>
          <p>「CRITTERS BUEGER」をお気に入りから削除しますか？</p>
          <div>
            <button onClick={handleDialogClose}>はい</button>
            <button onClick={handleDialogClose}>いいえ</button>
          </div>
        </dialog>
        <Navigation />
      </main>
    </>
  );
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
`;
const favList = css``;
const favItem = css`
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  background: var(--color-white);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 8px;
  margin: 0 0 10px;
`;
const favShopImg = css`
  > img {
    width: 53px;
    height: 53px;
    border-radius: 4px;
    object-fit: cover;
  }
`;
const favShopDetail = css`
  display: flex;
  align-items: center;
  text-decoration: underline;
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-normal);
`;
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
`;

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
`;
