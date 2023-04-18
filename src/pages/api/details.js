const details = async (req, res) => {
  const { place_id } = req.query
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?fields=name,rating,user_ratings_total,opening_hours,vicinity,photos,place_id&place_id=${place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ja`
  )
  const data = await response.json()
  res.status(200).json(data)
}

export default details

// https://maps.googleapis.com/maps/api/place/details/json?fields=name,rating,user_ratings_total,opening_hours,vicinity,photos,place_id&place_id=ChIJO3_3UPDmAGARn_D-9mF24iY&key=AIzaSyALKPhTFJYoWODv6U1RyCvHDKkNDl9_Z9k
