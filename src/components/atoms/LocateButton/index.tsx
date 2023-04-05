import React, { useState } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';

const LocationStyle = css`
  color: var(--color-white);
  width: 65px;
  height: 65px;
  position: absolute;
  bottom: 144px;
  right: 20px;
  border-radius: 50%;
  background: var(--color-dark-orange);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  img {
    margin: 0 auto 4px;
  }
  p {
    font-size: 10px;
    text-align: center;
  }
`;

export const LocateButton = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunc, errorFunc);
    } else {
      console.log('現在地を取得できませんでした。');
    }
  };
  const successFunc = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  };
  const errorFunc = () => {
    console.log('エラー発生');
  };

  return (
    <>
      <div css={LocationStyle} onClick={handleCurrentLocationClick}>
        <Image src="./images/location.svg" width={28} height={36} alt="" />
        <p>現在地</p>
      </div>
    </>
  );
};
