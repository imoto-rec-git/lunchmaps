interface Place {
  rating: number
  user_ratings_total: number
  price_level: number
}

export const useGetMakerIcon = () => {
  const getMakerIcon = (place: Place) => {
    let iconPath: string
    if (place.rating >= 4 && place.user_ratings_total > 80) {
      iconPath = './images/good.svg'
    } else if (place.price_level <= 2) {
      iconPath = './images/reasonable.svg'
    } else {
      iconPath = './images/normal.svg'
    }
    return iconPath
  }
  return { getMakerIcon }
}
