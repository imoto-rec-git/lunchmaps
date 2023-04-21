import React, { useContext, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { TextBox } from '@/components/atoms/TextBox'
import { LocateButton } from '@/components/atoms/LocateButton'
import { ShopDetail } from '@/components/molecules/ShopDetail'
import { Map } from '@/components/molecules/Map'
import { PositionContext } from '@/providers/IsPositionProvider'

export const Homes = () => {
  const { positionLat, setPositionLat, positionLng, setPositionLng } =
    useContext(PositionContext)
  const [places, setPlaces] = useState(null)
  const [shopName, setShopName] = useState('')
  const [shopPhoto, setShopPhoto] = useState('')
  const [shopOpen, setShopOpen] = useState('')
  const [shopAddress, setShopAddress] = useState('')
  const [shopRating, setShopRating] = useState('')
  const [shopRatingTotal, setRatingTotal] = useState('')
  const [shopBusinessHours, setShopBusinessHours] = useState([])
  const [placeId, setPlaceId] = useState('')
  const [active, setActive] = useState('')

  useEffect(() => {
    fetch(`/api/places?location=${positionLat},${positionLng}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data.results))
      .catch((err) => console.log(err))
  }, [positionLat, positionLng])

  return (
    <>
      <section css={mapContainer}>
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
            state={true}
          />
          <LocateButton setLat={setPositionLat} setLng={setPositionLng} />
          <TextBox setLat={setPositionLat} setLng={setPositionLng} />
        </div>
      </section>
    </>
  )
}

const mapContainer = css`
  height: calc(100svh - 70px);
  height: calc(100vh - 70px);
`
const maps = css`
  background: var(--color-white);
`
