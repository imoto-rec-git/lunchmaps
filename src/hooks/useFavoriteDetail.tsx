import { Dispatch, SetStateAction } from 'react'
interface Data {
  name: string
  opening_hours: {
    open_now: boolean
    weekday_text: string[]
  }
  photos: {
    0: {
      photo_reference: string
    }
  }
  place_id: string
  rating: number
  user_ratings_total: number
  vicinity: string
}
interface UseFavoriteDetail {
  setFavoriteShopInfo: Dispatch<SetStateAction<Data>>
  setActive: Dispatch<SetStateAction<string>>
}

export const useFavoriteDetail = ({
  setFavoriteShopInfo,
  setActive,
}: UseFavoriteDetail) => {
  const handleFavoriteDetail = async (place_id: string) => {
    const res = await fetch(`/api/details?place_id=${place_id}`)
    const data = await res.json()
    setFavoriteShopInfo(data.result)
    setActive('active')
  }
  return { handleFavoriteDetail }
}
