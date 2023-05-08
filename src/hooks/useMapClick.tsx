export const useMapClick = ({ setPositionLat, setPositionLng }) => {
  const handleLocationClick = (e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }
    setPositionLat(newMarker.lat)
    setPositionLng(newMarker.lng)
  }
  return { handleLocationClick }
}
