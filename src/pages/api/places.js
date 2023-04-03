const places = async (req, res) => {
  const response = await fetch(
    // GoogleMapPlaces API
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=34.69299270474642,135.49621535648794&radius=200&type=restaurant&keyword="ランチ"&language=ja`
    // Hotpepper API
    // `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_HOTPEPPER_API_KEY}&lat=34.69299270474642&lng=135.49621535648794&range=3&count=60&format=json`
  )
  const data = await response.json()
  res.status(200).json(data)
}

export default places
