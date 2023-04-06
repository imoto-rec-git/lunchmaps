const places = async (req, res) => {
  const { location } = req.query
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${location}&radius=150&type=restaurant&keyword="ランチ"&language=ja`
  )
  const data = await response.json()
  res.status(200).json(data)
}

export default places

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyALKPhTFJYoWODv6U1RyCvHDKkNDl9_Z9k&location=34.69299270474642,135.49621535648794&radius=200&type=restaurant&keyword="ランチ"&language=ja
