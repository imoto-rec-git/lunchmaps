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
  a {
    color: var(--color-black);
    text-decoration: underline;
  }
  > img {
    margin: 42px auto 0;
    border-radius: 8px;
  }
`

export const Map = () => {
  const [places, setPlaces] = useState(null)
  const [shopName, setShopName] = useState("")
  const [shopPhoto, setShopPhoto] = useState("")
  const [shopOpen, setShopOpen] = useState("")
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
          {shopName && <p>{shopName}</p>}
          {shopPhoto && (
            <Image src={shopPhoto} width={400} height={400} alt="" />
          )}
          {shopOpen ? <p>営業中</p> : <p>閉店中</p>}
          <button>お気に入り</button>
          <button onClick={handleBackClick}>戻る</button>
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
