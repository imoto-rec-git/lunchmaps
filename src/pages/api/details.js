const details = async (req, res) => {
  const { placeId } = req.query;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?fields=opening_hours&place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  res.status(200).json(data);
};

export default details;
