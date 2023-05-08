export const useAreaSearch = ({
  areaSearch,
  setAreaSearch,
  setLat,
  setLng,
}) => {
  const handleAreaSearch = (e) => {
    setAreaSearch(e.target.value)
  }
  const handleAreaSubmit = (e) => {
    e.preventDefault()
    codeAddress()
    setAreaSearch('')
  }
  const codeAddress = () => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: areaSearch }, function (results, status) {
      if (status == 'OK') {
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
