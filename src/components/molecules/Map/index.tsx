import React, { useContext, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { PositionContext } from '@/providers/IsPositionProvider'
import { useMapClick } from '@/hooks/useMapClick'
import { useUnsetActive } from '@/hooks/useUnsetActive'
import { useMapFavoriteDetail } from '@/hooks/useMapFavoriteDetail'
import { useShopDetail } from '@/hooks/useShopDetail'
import { useCustomMarker } from '@/hooks/useCustomMarker'
import { useGetMakerIcon } from '@/hooks/useGetMakerIcon'
import { useMapFavoriteDisplay } from '@/hooks/useMapFavoriteDisplay'
import { useUnsubscribe } from '@/hooks/useUnsubscribe'

export const Map = ({
  places,
  setShopBusinessHours,
  setShopName,
  setShopOpen,
  setShopPhoto,
  setShopAddress,
  setShopRating,
  setRatingTotal,
  setPlaceId,
  setActive,
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const zoom = 18
  const options = {
    disableDefaultUI: true,
  }

  const [user, setUser] = useState(null)
  const [userFavShpoList, setUserFavShopList] = useState([])
  const [userFavShopLocation, setUserFavShopLoaction] = useState([])
  const { positionLat, setPositionLat, positionLng, setPositionLng } =
    useContext(PositionContext)

  const { fetchData } = useMapFavoriteDisplay({
    setUserFavShopList,
    setUserFavShopLoaction,
  })
  useUnsubscribe({ setUser, fetchData })
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  })
  const { getMakerIcon } = useGetMakerIcon()
  const { CustomMarker } = useCustomMarker({ getMakerIcon })
  const { handleRestaurantClick } = useShopDetail({
    setShopBusinessHours,
    setShopName,
    setShopOpen,
    setShopPhoto,
    setShopAddress,
    setShopRating,
    setRatingTotal,
    setPlaceId,
    setActive,
    apiKey,
  })
  const { handleFavClick } = useMapFavoriteDetail({
    setShopName,
    setShopBusinessHours,
    setShopOpen,
    setShopPhoto,
    setShopAddress,
    setShopRating,
    setRatingTotal,
    setPlaceId,
    setActive,
    apiKey,
  })
  const { handleReturn } = useUnsetActive({ setActive })
  const { handleLocationClick } = useMapClick({
    setPositionLat,
    setPositionLng,
  })
  return (
    <>
      {isLoaded && places && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: positionLat, lng: positionLng }}
          zoom={zoom}
          options={options}
          clickableIcons={false}
          onClick={handleLocationClick}
          onDrag={handleReturn}
        >
          <MarkerF position={{ lat: positionLat, lng: positionLng }} />
          {places.map((place, index: number) => (
            <CustomMarker
              key={index}
              place={place}
              onClick={handleRestaurantClick}
            />
          ))}
          {userFavShpoList.map((userFavShpo, index) => (
            <MarkerF
              key={index}
              position={{
                lat: userFavShopLocation[index][0],
                lng: userFavShopLocation[index][1],
              }}
              icon="./images/favorite.svg"
              onClick={() => handleFavClick(userFavShpo)}
            />
          ))}
        </GoogleMap>
      )}
    </>
  )
}

const containerStyle = {
  width: '100%',
  height: '100%',
}
