export const useFavoriteDetail = ({ setFavoriteShopInfo, setActive }) => {
  const handleFavoriteDetail = async (place_id: string) => {
    const res = await fetch(`/api/details?place_id=${place_id}`)
    const data = await res.json()
    setFavoriteShopInfo(data.result)
    setActive('active')
  }
  return { handleFavoriteDetail }
}
