import { Dispatch, SetStateAction } from 'react'

interface useMapClickProps {
  setPositionLat: Dispatch<SetStateAction<number>>
  setPositionLng: Dispatch<SetStateAction<number>>
}

export const useMapClick = ({
  setPositionLat,
  setPositionLng,
}: useMapClickProps) => {
  const handleLocationClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newMarker = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }
      setPositionLat(newMarker.lat)
      setPositionLng(newMarker.lng)
    }
  }
  return { handleLocationClick }
}
