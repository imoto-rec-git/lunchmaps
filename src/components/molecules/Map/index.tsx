import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { User, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../../firebase'
import { doc, getDoc } from 'firebase/firestore'

export const Map = ({
  positionLat,
  positionLng,
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
  const center = {
    lat: positionLat,
    lng: positionLng,
  }
  const zoom = 18
  const options = {
    disableDefaultUI: true,
  }
  const getMakerIcon = (place) => {
    let iconPath
    if (place.rating >= 4 && place.user_ratings_total > 80) {
      iconPath = './images/good.svg'
    } else if (place.price_level <= 2) {
      iconPath = './images/reasonable.svg'
    } else {
      iconPath = './images/normal.svg'
    }
    return iconPath
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
  return (
    <>
      {isLoaded && places && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={options}
          clickableIcons={false}
          onClick={unsetActive}
          onDrag={unsetActive}
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
          {userFavShpoList.map((userFavShpo, index) => (
            <MarkerF
              key={index}
              position={{
                lat: userFavShopLocation[index][0],
                lng: userFavShopLocation[index][1],
              }}
              icon='./images/favorite.svg'
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
