import React, { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const shopDetailStyle = css`
  width: calc(100% - 20px);
  height: 100%;
  z-index: 2;
  position: absolute;
  top: 0;
  right: 100%;
  background: #fff;
  box-shadow: -4px 0px 12px rgba(0, 0, 0, 0.25);
  padding: 14px;
  a {
    color: var(--color-black);
    text-decoration: underline;
  }
  > img {
    margin: 42px auto 0;
    border-radius: 8px;
  }
`;

export const Map = () => {
  const [places, setPlaces] = useState(null);
  const [shopName, setShopName] = useState('');
  const [shopImg, setShopImg] = useState('');
  const [shopAverage, setShopAverage] = useState('');
  const [shopOpen, setShopOpen] = useState('');
  const [shopClose, setShopClose] = useState('');
  const [shopUrl, setShopUrl] = useState('');
  const [active, setActive] = useState('');

  useEffect(() => {
    fetch('/api/places')
      .then((res) => res.json())
      .then((data) => setPlaces(data.results.shop))
      .catch((err) => console.log(err));
  }, []);

  const containerStyle = {
    width: '100%',
    height: 'calc(100svh - 70px)',
  };
  const center = {
    lat: 34.69299270474642,
    lng: 135.49621535648794,
  };
  const zoom = 17;
  const options = {
    disableDefaultUI: true,
  };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });
  const test = (shopInfo) => {
    setShopName(shopInfo.name);
    setShopImg(shopInfo.photo.pc.l);
    setShopAverage(shopInfo.budget.average);
    setShopOpen(shopInfo.open);
    setShopClose(shopInfo.close);
    setShopUrl(shopInfo.urls.pc);
    setActive('active');
  };
  const handleBack = () => {
    console.log('test');
    setActive('');
  };
  if (isLoaded) {
    return (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={options}
        >
          <MarkerF position={center} />
          {places.map((e, index: number) => (
            <MarkerF
              key={index}
              position={{
                lat: e.lat,
                lng: e.lng,
              }}
              icon="./images/normal.svg"
              onClick={() => test(e)}
            />
          ))}
        </GoogleMap>
        <div css={shopDetailStyle} className={active && 'active'}>
          {shopName && <p>{shopName}</p>}
          {shopImg && <img src={shopImg} width={238} height={238} alt="" />}
          {/* 予算 */}
          {shopAverage && <p>平均金額：{shopAverage}</p>}
          {/* 営業時間 */}
          {shopOpen && <p>営業時間：{shopOpen}</p>}
          {/* 定休日 */}
          {shopClose && <p>定休日：{shopClose}</p>}
          {/* ホットペッパーURL */}
          {shopUrl && (
            <p>
              <Link href={shopUrl}>ホットペッパーグルメへ</Link>
            </p>
          )}
          <button>お気に入り</button>
          <button onClick={handleBack}>戻る</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p>マップが読み込めませんでした。</p>
      </>
    );
  }
};
