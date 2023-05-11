import React from 'react'
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
  rating: string
  user_ratings_total: string
  vicinity: string
}
interface UseFavoriteDetail {
  setFavoriteShopInfo: React.Dispatch<React.SetStateAction<Data>>
  setActive: React.Dispatch<React.SetStateAction<string>>
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
