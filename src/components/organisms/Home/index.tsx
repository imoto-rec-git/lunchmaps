import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
// import { LocateButton } from '@/components/atoms/LocateButton';
// import { Map } from '@/components/molecules/Map';
// import { TextBox } from '@/components/atoms/TextBox';
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import Image from "next/image"

const maps = css`
  background: var(--color-white);
`

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
`

const TextBoxStyle = css`
  form {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 80px;
    z-index: 1;
    width: calc(100% - 20px);
    display: flex;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  input {
    width: calc(100% - 55px);
    border-top: 3px solid var(--color-dark-orange);
    border-left: 3px solid var(--color-dark-orange);
    border-bottom: 3px solid var(--color-dark-orange);
    border-right: none;
    background: var(--color-white);
    border-radius: 24px 0 0 24px;
    padding: 9px 18px;
    ::placeholder {
      font-size: 12px;
      color: #d2d2d2;
    }
  }

  button {
    color: var(--color-white);
    width: 55px;
    border: none;
    border-radius: 0 24px 24px 0;
    background: var(--color-dark-orange);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Homes = () => {
  const [places, setPlaces] = useState(null)
  const [shopName, setShopName] = useState("")
  const [shopPhoto, setShopPhoto] = useState("")
  const [shopOpen, setShopOpen] = useState("")
  const [shopAddress, setShopAddress] = useState("")
  const [shopRating, setShopRating] = useState("")
  const [shopRatingTotal, setRatingTotal] = useState("")
  const [positionLat, setPositionLat] = useState(34.68740858067861)
  const [positionLng, setPositionLng] = useState(135.5258174994773)
  const [active, setActive] = useState("")

  useEffect(() => {
    fetch(`/api/places?location=${positionLat},${positionLng}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data.results))
      .catch((err) => console.log(err))
  }, [positionLat, positionLng])

  const center = {
    lat: positionLat,
    lng: positionLng,
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
    if (place.rating >= 4.3 && place.user_ratings_total > 100) {
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

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunc, errorFunc)
    } else {
      console.log("現在地を取得できませんでした。")
    }
  }
  const successFunc = (position) => {
    setPositionLat(position.coords.latitude)
    setPositionLng(position.coords.longitude)
  }
  const errorFunc = () => {
    console.log("エラー発生")
  }

  const [areaSearch, setAreaSearch] = useState("")
  const codeAddress = () => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: areaSearch }, function (results, status) {
      if (status == "OK") {
        const lat = results[0].geometry.location.lat()
        setPositionLat(lat)
        const lng = results[0].geometry.location.lng()
        setPositionLng(lng)
      } else {
        console.log("検索結果は0です。")
      }
    })
  }
  const handleAreaSearch = (e) => {
    setAreaSearch(e.target.value)
  }
  const handleAreaSubmit = (e) => {
    e.preventDefault()
    codeAddress()
    setAreaSearch("")
  }

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

          <div css={LocationStyle} onClick={handleCurrentLocationClick}>
            <Image src="./images/location.svg" width={28} height={36} alt="" />
            <p>現在地</p>
          </div>

          <div css={TextBoxStyle}>
            <form onSubmit={handleAreaSubmit}>
              <input
                type="text"
                value={areaSearch}
                placeholder="エリア検索（例：大阪市中央区、本町駅など）"
                onChange={handleAreaSearch}
              />
              <button type="submit">
                <Image
                  src="./images/search.svg"
                  width={25}
                  height={25}
                  alt=""
                />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
