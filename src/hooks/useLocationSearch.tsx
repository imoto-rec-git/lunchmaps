import { Dispatch, SetStateAction } from 'react'

interface UseLocationSearchProps {
  setLat: Dispatch<SetStateAction<number>>
  setLng: Dispatch<SetStateAction<number>>
}
interface GeolocationPosition {
  coords: {
    latitude: number
    longitude: number
  }
}
export const useLocationSearch = ({
  setLat,
  setLng,
}: UseLocationSearchProps) => {
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunc, errorFunc)
    } else {
      console.log('現在地を取得できませんでした。')
    }
  }
  const successFunc = (position: GeolocationPosition) => {
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)
  }
  const errorFunc = () => {
    console.log('エラー発生')
  }
  return { handleCurrentLocationClick, successFunc, errorFunc }
}
