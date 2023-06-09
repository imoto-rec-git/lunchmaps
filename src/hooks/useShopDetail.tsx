import { Dispatch, SetStateAction } from 'react'

interface useShopDetailProps {
  setShopBusinessHours: Dispatch<SetStateAction<string[]>>
  setShopName: Dispatch<SetStateAction<string>>
  setShopOpen: Dispatch<SetStateAction<boolean>>
  setShopPhoto: Dispatch<SetStateAction<string>>
  setShopAddress: Dispatch<SetStateAction<string>>
  setShopRating: Dispatch<SetStateAction<number>>
  setRatingTotal: Dispatch<SetStateAction<number>>
  setPlaceId: Dispatch<SetStateAction<string>>
  setActive: Dispatch<SetStateAction<string>>
  apiKey: string
}

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

export const useShopDetail = ({
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
}: useShopDetailProps) => {
  const handleRestaurantClick = (place: Place) => {
    if (place.place_id) {
      fetch(`/api/details_open_hours?place_id=${place.place_id}`)
        .then((res) => res.json())
        .then((detail_data) =>
          setShopBusinessHours(detail_data.result.opening_hours.weekday_text)
        )
        .catch((err) => console.log(err))
    }
    place.name && setShopName(place.name)
    place.opening_hours && setShopOpen(place.opening_hours.open_now)
    place.photos &&
      setShopPhoto(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${apiKey}`
      )
    place.vicinity && setShopAddress(place.vicinity)
    place.rating && setShopRating(place.rating)
    place.user_ratings_total && setRatingTotal(place.user_ratings_total)
    setPlaceId(place.place_id)
    setActive('active')
  }
  return { handleRestaurantClick }
}
