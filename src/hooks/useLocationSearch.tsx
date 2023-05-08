export const useLocationSearch = ({ setLat, setLng }) => {
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunc, errorFunc)
    } else {
      console.log('現在地を取得できませんでした。')
    }
  }
  const successFunc = (position) => {
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)
  }
  const errorFunc = () => {
    console.log('エラー発生')
  }
  return { handleCurrentLocationClick, successFunc, errorFunc }
}
