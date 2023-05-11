interface useShopDetailProps {
  setShopBusinessHours: React.Dispatch<React.SetStateAction<string[]>>
  setShopName: React.Dispatch<React.SetStateAction<string>>
  setShopOpen: React.Dispatch<React.SetStateAction<boolean>>
  setShopPhoto: React.Dispatch<React.SetStateAction<string>>
  setShopAddress: React.Dispatch<React.SetStateAction<string>>
  setShopRating: React.Dispatch<React.SetStateAction<string>>
  setRatingTotal: React.Dispatch<React.SetStateAction<string>>
  setPlaceId: React.Dispatch<React.SetStateAction<string>>
  setActive: React.Dispatch<React.SetStateAction<string>>
  apiKey: string
}

interface ShopDetailData {
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
  rating: string
  user_ratings_total: string
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
  const handleRestaurantClick = (data: ShopDetailData) => {
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
      data.photos.length < 0 &&
      setShopPhoto(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data.photos[0].photo_reference}&key=${apiKey}`
      )
    data.vicinity && setShopAddress(data.vicinity)
    data.rating && setShopRating(data.rating)
    data.user_ratings_total && setRatingTotal(data.user_ratings_total)
    setPlaceId(data.place_id)
    setActive('active')
  }
  return { handleRestaurantClick }
}
