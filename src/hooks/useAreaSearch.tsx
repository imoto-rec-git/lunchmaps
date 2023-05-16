import { SetStateAction } from 'react'

export const useAreaSearch = ({
  areaSearch,
  setAreaSearch,
  setLat,
  setLng,
}: {
  areaSearch: string
  setAreaSearch: React.Dispatch<React.SetStateAction<string>>
  setLat: React.Dispatch<React.SetStateAction<number>>
  setLng: React.Dispatch<React.SetStateAction<number>>
}) => {
  const handleAreaSearch = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setAreaSearch(e.target.value)
  }
  const handleAreaSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    codeAddress()
    setAreaSearch('')
  }
  const codeAddress = () => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: areaSearch }, function (results, status) {
      if (status == 'OK' && results && results.length > 0) {
        const lat = results[0].geometry.location.lat()
        setLat(lat)
        const lng = results[0].geometry.location.lng()
        setLng(lng)
      } else {
        alert('エリアが取得できませんでした。')
      }
    })
  }
  return { handleAreaSearch, handleAreaSubmit }
}
