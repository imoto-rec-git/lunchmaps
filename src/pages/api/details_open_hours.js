const details = async (req, res) => {
  const { place_id } = req.query
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?fields=opening_hours&place_id=${place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ja`
  )
  const data = await response.json()
  res.status(200).json(data)
}

export default details
