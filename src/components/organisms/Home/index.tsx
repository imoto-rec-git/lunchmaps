import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { TextBox } from '@/components/atoms/TextBox';
import { LocateButton } from '@/components/atoms/LocateButton';
import { ShopDetail } from '@/components/molecules/ShopDetail';
import { Map } from '@/components/molecules/Map';

export const Homes = () => {
  const [places, setPlaces] = useState(null);
  const [shopName, setShopName] = useState('');
  const [shopPhoto, setShopPhoto] = useState('');
  const [shopOpen, setShopOpen] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopRating, setShopRating] = useState('');
  const [shopRatingTotal, setRatingTotal] = useState('');
  const [shopBusinessHours, setShopBusinessHours] = useState([]);
  const [positionLat, setPositionLat] = useState(34.691125259452555);
  const [positionLng, setPositionLng] = useState(135.4964441534794);
  const [placeId, setPlaceId] = useState('');
  const [active, setActive] = useState('');

  useEffect(() => {
    fetch(`/api/places?location=${positionLat},${positionLng}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data.results))
      .catch((err) => console.log(err));
  }, [positionLat, positionLng]);

  return (
    <>
      <section>
        <Map
          positionLat={positionLat}
          positionLng={positionLng}
          places={places}
          setShopBusinessHours={setShopBusinessHours}
          setShopName={setShopName}
          setShopOpen={setShopOpen}
          setShopPhoto={setShopPhoto}
          setShopAddress={setShopAddress}
          setShopRating={setShopRating}
          setRatingTotal={setRatingTotal}
          setPlaceId={setPlaceId}
          setActive={setActive}
        />
        <div css={maps}>
          <ShopDetail
            placeId={placeId}
            setActive={setActive}
            active={active}
            shopPhoto={shopPhoto}
            shopName={shopName}
            shopRating={shopRating}
            shopRatingTotal={shopRatingTotal}
            shopOpen={shopOpen}
            shopBusinessHours={shopBusinessHours}
            shopAddress={shopAddress}
          />
          <LocateButton setLat={setPositionLat} setLng={setPositionLng} />
          <TextBox setLat={setPositionLat} setLng={setPositionLng} />
        </div>
      </section>
    </>
  );
};

const maps = css`
  background: var(--color-white);
`;
