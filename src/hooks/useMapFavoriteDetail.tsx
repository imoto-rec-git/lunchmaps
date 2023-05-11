import React from 'react'

interface useMapFavoriteDetailProps {
  setShopName: React.Dispatch<React.SetStateAction<string>>
  setShopBusinessHours: React.Dispatch<React.SetStateAction<string[]>>
  setShopOpen: React.Dispatch<React.SetStateAction<string>>
  setShopPhoto: React.Dispatch<React.SetStateAction<string>>
  setShopAddress: React.Dispatch<React.SetStateAction<string>>
  setShopRating: React.Dispatch<React.SetStateAction<string>>
  setRatingTotal: React.Dispatch<React.SetStateAction<string>>
  setPlaceId: React.Dispatch<React.SetStateAction<string>>
  setActive: React.Dispatch<React.SetStateAction<string>>
  apiKey: React.Dispatch<React.SetStateAction<string>>
}

export const useMapFavoriteDetail = ({
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
}: useMapFavoriteDetailProps) => {
  const handleFavClick = async (data: string) => {
    if (data) {
      const res = await fetch(`/api/details?place_id=${data}`)
      const detailData = await res.json()
      const favData = detailData.result

      favData.name && setShopName(favData.name)
      favData.opening_hours.weekday_text &&
        setShopBusinessHours(favData.opening_hours.weekday_text)
      favData.opening_hours && setShopOpen(favData.opening_hours.open_now)
      favData.photos &&
        favData.photos.length > 0 &&
        setShopPhoto(
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${favData.photos[0].photo_reference}&key=${apiKey}`
        )
      favData.vicinity && setShopAddress(favData.vicinity)
      favData.rating && setShopRating(favData.rating)
      favData.user_ratings_total && setRatingTotal(favData.user_ratings_total)
      setPlaceId(favData.place_id)
      setActive('active')
    }
  }
  return { handleFavClick }
}
