import React, { useContext, useEffect, useMemo, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { PositionContext } from '@/providers/IsPositionProvider'

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
  const [user, setUser] = useState(null)
  const [userFavShpoList, setUserFavShopList] = useState([])
  const [userFavShopLocation, setUserFavShopLoaction] = useState([])
  const { positionLat, setPositionLat, positionLng, setPositionLng } =
    useContext(PositionContext)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        fetchData(user)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  const fetchData = async (user: User) => {
    // fireStore読み込み
    const userFavListData = async () => {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists() && docSnap.data().favoriteList) {
        const placeIdData = []
        const latLngData = []

        for (let i = 0; i < docSnap.data().favoriteList.length; i++) {
          placeIdData.push(docSnap.data().favoriteList[i])
          const res = await fetch(
            `/api/details_latlng?place_id=${docSnap.data().favoriteList[i]}`
          )
          const data = await res.json()
          latLngData.push([
            data.result.geometry.location.lat,
            data.result.geometry.location.lng,
          ])
        }
        setUserFavShopList(placeIdData)
        setUserFavShopLoaction(latLngData)
      } else {
        console.log('No such document!')
      }
    }
    userFavListData()
  }
  const zoom = 18
  const options = {
    disableDefaultUI: true,
  }
  const getMakerIcon = (place) => {
    let iconPath: string
    if (place.rating >= 4 && place.user_ratings_total > 80) {
      iconPath = './images/good.svg'
    } else if (place.price_level <= 2) {
      iconPath = './images/reasonable.svg'
    } else {
      iconPath = './images/normal.svg'
    }
    return iconPath
  }
  const CustomMarker = ({ place, onClick }) => {
    const iconPath = useMemo(() => getMakerIcon(place), [place])
    return (
      <MarkerF
        key={place.id}
        position={{
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        }}
        icon={{
          url: iconPath,
        }}
        onClick={() => onClick(place)}
      />
    )
  }
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  })
  const handleRestaurantClick = (data) => {
    if (data.place_id) {
      fetch(`/api/details_open_hours?place_id=${data.place_id}`)
        .then((res) => res.json())
        .then((detail_data) =>
          setShopBusinessHours(detail_data.result.opening_hours.weekday_text)
        )
        .catch((err) => console.log(err))
    }
    data.name && setShopName(data.name)
    data.opening_hours && setShopOpen(data.opening_hours.open_now)
    data.photos &&
      setShopPhoto(
        data.photos !== undefined &&
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data.photos[0].photo_reference}&key=${apiKey}`
      )
    data.vicinity && setShopAddress(data.vicinity)
    data.rating && setShopRating(data.rating)
    data.user_ratings_total && setRatingTotal(data.user_ratings_total)
    setPlaceId(data.place_id)
    setActive('active')
  }
  const handleFavClick = async (data) => {
    if (data) {
      const res = await fetch(`/api/details?place_id=${data}`)
      const detailData = await res.json()
      const favData = detailData.result

      favData.name && setShopName(favData.name)
      favData.opening_hours.weekday_text &&
        setShopBusinessHours(favData.opening_hours.weekday_text)
      favData.opening_hours && setShopOpen(favData.opening_hours.open_now)
      favData.photos &&
        setShopPhoto(
          favData.photos !== undefined &&
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${favData.photos[0].photo_reference}&key=${apiKey}`
        )
      favData.vicinity && setShopAddress(favData.vicinity)
      favData.rating && setShopRating(favData.rating)
      favData.user_ratings_total && setRatingTotal(favData.user_ratings_total)
      setPlaceId(favData.place_id)
      setActive('active')
    }
  }
  const unsetActive = () => {
    setActive('')
  }
  const handleLocationClick = (e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }
    setPositionLat(newMarker.lat)
    setPositionLng(newMarker.lng)
  }
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
          onDrag={unsetActive}
        >
          <MarkerF
            // position={center}
            position={{ lat: positionLat, lng: positionLng }}
          />
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
