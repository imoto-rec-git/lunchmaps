import React, { useEffect, useState } from "react"
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { css } from "@emotion/react"
import Image from "next/image"

const containerStyle = {
  width: "100%",
  height: "calc(100svh - 70px)",
}
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
  h3 {
    font-size: var(--font-size-large);
    margin: 0 40px 24px 0;
  }
  > img {
    width: 240px;
    margin: 0 auto 24px;
    border-radius: 8px;
  }
  a {
    color: var(--color-black);
    text-decoration: underline;
  }
  > p {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-medium);
    margin: 0 14px;
  }
`
const favoriteButton = css`
  position: absolute;
  bottom: 90px;
  left: 0;
  right: 0;
  margin: auto;
  width: 127px;
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
    content: "";
    width: 24px;
    height: 24px;
    background-image: url("./images/heart.svg");
    background-size: 24px 24px;
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
`

export const Map = () => {
  const [places, setPlaces] = useState(null)
  const [shopName, setShopName] = useState("")
  const [shopPhoto, setShopPhoto] = useState("")
  const [shopOpen, setShopOpen] = useState("")
  const [shopAddress, setShopAddress] = useState("")
  const [shopRating, setShopRating] = useState("")
  const [shopRatingTotal, setRatingTotal] = useState("")
  const [active, setActive] = useState("")

  useEffect(() => {
    fetch("/api/places")
      .then((res) => res.json())
      .then((data) => setPlaces(data.results))
      .catch((err) => console.log(err))
  }, [])

  const center = {
    lat: 34.69299270474642,
    lng: 135.49621535648794,
  }
  const zoom = 18
  const options = {
    disableDefaultUI: true,
  }
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  })
  const getMakerIcon = (place) => {
    let iconPath
    if (place.rating >= 4.4 && place.user_ratings_total > 50) {
      iconPath = "./images/good.svg"
    } else if (place.price_level <= 2) {
      iconPath = "./images/reasonable.svg"
    } else {
      iconPath = "./images/normal.svg"
    }
    return iconPath
  }
  const handleRestaurantClick = (data) => {
    setShopName(data.name)
    setShopOpen(data.opening_hours.open_now)
    setShopPhoto(
      data.photos !== undefined &&
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data.photos[0].photo_reference}&key=${apiKey}`
    )
    setShopAddress(data.vicinity)
    setShopRating(data.rating)
    setRatingTotal(data.user_ratings_total)
    setActive("active")
  }
  const handleBackClick = () => {
    setActive("")
  }

  if (isLoaded) {
    return (
      <>
        {places && (
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
        <div css={shopDetailStyle} className={active && "active"}>
          {shopName && <h3>{shopName}</h3>}
          {shopPhoto && (
            <Image src={shopPhoto} width={400} height={400} alt="" />
          )}
          {shopOpen ? <p>営業中</p> : <p>閉店中</p>}
          <p>{shopAddress}</p>
          <p>
            評価：{shopRating}（{shopRatingTotal}）
          </p>
          <button css={favoriteButton}>お気に入り</button>
          <button css={backButton} onClick={handleBackClick}>
            <Image src="./images/arrow.svg" width={10} height={12} alt="" />
          </button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <p>マップ読み込み中...</p>
      </>
    )
  }
}
