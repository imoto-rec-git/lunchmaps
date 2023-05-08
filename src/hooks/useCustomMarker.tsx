import { MarkerF } from '@react-google-maps/api'
import { useMemo } from 'react'

export const useCustomMarker = ({ getMakerIcon }) => {
  const CustomMarker = ({ place, onClick }) => {
    const iconPath = useMemo(() => getMakerIcon(place), [place])
    return (
      <MarkerF
        key={place.id}
        position={{
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        }}
        icon={{
          url: iconPath,
        }}
        onClick={() => onClick(place)}
      />
    )
  }
  return { CustomMarker }
}
