const details = async (req, res) => {
  const { place_id } = req.query
  const response = await fetch(
    // `https://maps.googleapis.com/maps/api/place/details/json?fields=opening_hours&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&place_id=${place_id}&language=ja`
    "/json/detail.json"
  )
  const data = await response.json()
  res.status(200).json(data)
}

export default details

// https://maps.googleapis.com/maps/api/place/details/json?fields=opening_hours&key=AIzaSyALKPhTFJYoWODv6U1RyCvHDKkNDl9_Z9k&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4
