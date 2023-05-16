import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
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
import { User } from 'firebase/auth'

interface Place {
  id: number
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  place_id: string
  name: string
  opening_hours: {
    weekday_text: string[]
    open_now: boolean
  }
  photos: {
    photo_reference: string
  }[]
  vicinity: string
  rating: number
  user_ratings_total: number
  price_level: number
}
interface MapProps {
  places: Place[]
  setShopBusinessHours: Dispatch<SetStateAction<string[]>>
  setShopName: Dispatch<SetStateAction<string>>
  setShopOpen: Dispatch<SetStateAction<boolean>>
  setShopPhoto: Dispatch<SetStateAction<string>>
  setShopAddress: Dispatch<SetStateAction<string>>
  setShopRating: Dispatch<SetStateAction<number>>
  setRatingTotal: Dispatch<SetStateAction<number>>
  setPlaceId: Dispatch<SetStateAction<string>>
  setActive: Dispatch<SetStateAction<string>>
}
interface PositionContext {
  positionLat: number
  setPositionLat: Dispatch<SetStateAction<number>>
  positionLng: number
  setPositionLng: Dispatch<SetStateAction<number>>
}

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
}: MapProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const zoom = 18
  const options = {
    disableDefaultUI: true,
  }

  const [user, setUser] = useState<User | null>(null)
  const [userFavShpoList, setUserFavShopList] = useState<string[]>([])
  const [userFavShopLocation, setUserFavShopLoaction] = useState<number[][]>([])
  const { positionLat, setPositionLat, positionLng, setPositionLng } =
    useContext(PositionContext) as PositionContext

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
          {places.map((place: Place, index: number) => (
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
