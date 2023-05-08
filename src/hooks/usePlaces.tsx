import { useContext, useEffect, useState } from 'react'
import { PositionContext } from '@/providers/IsPositionProvider'

export const usePlaces = () => {
  const { positionLat, setPositionLat, positionLng, setPositionLng } =
    useContext(PositionContext)
  const [places, setPlaces] = useState(null)
  const [shopName, setShopName] = useState('')
  const [shopPhoto, setShopPhoto] = useState('')
  const [shopOpen, setShopOpen] = useState('')
  const [shopAddress, setShopAddress] = useState('')
  const [shopRating, setShopRating] = useState('')
  const [shopRatingTotal, setRatingTotal] = useState('')
  const [shopBusinessHours, setShopBusinessHours] = useState([])
  const [placeId, setPlaceId] = useState('')
  const [active, setActive] = useState('')

  useEffect(() => {
    fetch(`/api/places?location=${positionLat},${positionLng}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data.results))
      .catch((err) => console.log(err))
  }, [positionLat, positionLng])

  return {
    setPositionLat,
    setPositionLng,
    places,
    shopName,
    setShopName,
    shopPhoto,
    setShopPhoto,
    shopOpen,
    setShopOpen,
    shopAddress,
    setShopAddress,
    shopRating,
    setShopRating,
    shopRatingTotal,
    setRatingTotal,
    shopBusinessHours,
    setShopBusinessHours,
    placeId,
    setPlaceId,
    active,
    setActive,
  }
}
