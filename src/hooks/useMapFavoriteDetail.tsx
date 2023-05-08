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
}) => {
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
  return { handleFavClick }
}
