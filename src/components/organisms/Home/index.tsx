import { css } from '@emotion/react'
import { TextBox } from '@/components/atoms/TextBox'
import { LocateButton } from '@/components/atoms/LocateButton'
import { ShopDetail } from '@/components/molecules/ShopDetail'
import { Map } from '@/components/molecules/Map'
import { usePlaces } from '@/hooks/usePlaces'

export const Homes = () => {
  const {
    setPositionLat,
    setPositionLng,
    places,
    shopName,
    setShopName,
    shopPhoto,
    setShopPhoto,
    shopOpen,
    setShopOpen,
    shopAddress,
    setShopAddress,
    shopRating,
    setShopRating,
    shopRatingTotal,
    setRatingTotal,
    shopBusinessHours,
    setShopBusinessHours,
    placeId,
    setPlaceId,
    active,
    setActive,
  } = usePlaces()
  return (
    <>
      <section css={mapContainer}>
        <Map
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
