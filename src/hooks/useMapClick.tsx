import React, { MouseEvent } from 'react'

interface useMapClickProps {
  setPositionLat: React.Dispatch<React.SetStateAction<number>>
  setPositionLng: React.Dispatch<React.SetStateAction<number>>
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
