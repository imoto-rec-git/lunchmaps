import React from 'react'

interface useMapClickProps {
  setPositionLat: React.Dispatch<React.SetStateAction<number>>
  setPositionLng: React.Dispatch<React.SetStateAction<number>>
}
interface handleLocationClickProps {
  latLng: {
    lat(): number
    lng(): number
  }
}

export const useMapClick = ({
  setPositionLat,
  setPositionLng,
}: useMapClickProps) => {
  const handleLocationClick = (e: handleLocationClickProps) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }
    setPositionLat(newMarker.lat)
    setPositionLng(newMarker.lng)
  }
  return { handleLocationClick }
}
