const places = async (req, res) => {
  const { location } = req.query
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${location}&radius=150&type=restaurant&keyword="ランチ"&language=ja`
  )
  const data = await response.json()
  res.status(200).json(data)
}

export default places

// const places = async (req, res) => {
//   const { location } = req.query

//   let results = []
//   let nextPageToken = null

//   while (results.length < 60) {
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
//       process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
//     }&location=${location}&radius=150&type=restaurant&keyword="ランチ"&language=ja&pagetoken=${
//       nextPageToken || ''
//     }`

//     const response = await fetch(url)
//     const data = await response.json()
//     results.push(...data.results)

//     if (data.next_page_token) {
//       nextPageToken = data.next_page_token
//     } else {
//       break
//     }
//   }

//   console.log(results.length)
//   res.status(200).json({ results })
// }

// export default places
