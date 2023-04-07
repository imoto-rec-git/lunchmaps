import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import Image from 'next/image';
import { TextBox } from '@/components/atoms/TextBox';
import { LocateButton } from '@/components/atoms/LocateButton';
import { ShopDetail } from '@/components/molecules/ShopDetail';

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
  const [active, setActive] = useState('');

  useEffect(() => {
    fetch(`/api/places?location=${positionLat},${positionLng}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data.results))
      .catch((err) => console.log(err));
  }, [positionLat, positionLng]);

  const center = {
    lat: positionLat,
    lng: positionLng,
  };
  const zoom = 18;
  const options = {
    disableDefaultUI: true,
  };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });
  const getMakerIcon = (place) => {
    let iconPath;
    if (place.rating >= 4 && place.user_ratings_total > 80) {
      iconPath = './images/good.svg';
    } else if (place.price_level <= 2) {
      iconPath = './images/reasonable.svg';
    } else {
      iconPath = './images/normal.svg';
    }
    return iconPath;
  };
  const handleRestaurantClick = (data) => {
    if (data.place_id) {
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?fields=opening_hours&place_id=${data.place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
        .then((res) => res.json())
        .then((detail_data) =>
          setShopBusinessHours(detail_data.result.opening_hours.weekday_text)
        )
        .catch((err) => console.log(err));
    }
    data.name && setShopName(data.name);
    data.opening_hours && setShopOpen(data.opening_hours.open_now);
    data.photos &&
      setShopPhoto(
        data.photos !== undefined &&
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data.photos[0].photo_reference}&key=${apiKey}`
      );
    data.vicinity && setShopAddress(data.vicinity);
    data.rating && setShopRating(data.rating);
    data.user_ratings_total && setRatingTotal(data.user_ratings_total);
    setActive('active');
  };

  return (
    <>
      <section>
        {isLoaded && places && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            options={options}
            clickableIcons={false}
          >
            <MarkerF position={center} />
            {places.map((place, index: number) => (
              <MarkerF
                key={index}
                position={{
                  lat: place.geometry.location.lat,
                  lng: place.geometry.location.lng,
                }}
                icon={{
                  url: getMakerIcon(place),
                }}
                onClick={() => handleRestaurantClick(place)}
              />
            ))}
          </GoogleMap>
        )}
        <div css={maps}>
          <ShopDetail
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
const containerStyle = {
  width: '100%',
  height: 'calc(100svh - 70px)',
};
