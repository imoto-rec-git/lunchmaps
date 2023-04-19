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
        console.log(docSnap.data().favoriteList)

        const fetchedData = []
        for (let i = 0; i < docSnap.data().favoriteList.length; i++) {
          console.log(docSnap.data().favoriteList[i])
          fetchedData.push(docSnap.data().favoriteList[i])
          // const res = await fetch(
          //   `/api/details?place_id=${docSnap.data().favoriteList[i]}`
          // )
          // const data = await res.json()
          // console.log(data.result)

          // fetchedData.push(data.result)
        }
        setUserFavShopList(fetchedData)
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
  return (
    <>
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
          {userFavShpoList.map((favShopList, index) => (
            <MarkerF
              key={index}
              position={{
                lat: 34.69096426501372,
                lng: 135.49688512700368,
              }}
              icon='./images/favorite.svg'
              onClick={() => handleRestaurantClick(favShopList)}
            />
          ))}
        </GoogleMap>
      )}
    </>
  )
}

const containerStyle = {
  width: '100%',
  height: 'calc(100svh - 70px)',
}
