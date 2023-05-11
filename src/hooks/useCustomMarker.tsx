import { MarkerF } from '@react-google-maps/api'
import { useMemo } from 'react'

interface Place {
  id: number
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}

interface CustomMarkerProps {
  place: Place
  onClick: (place: Place) => void
}

export const useCustomMarker = ({
  getMakerIcon,
}: {
  getMakerIcon: (place: Place) => string
}) => {
  const CustomMarker = ({ place, onClick }: CustomMarkerProps) => {
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
