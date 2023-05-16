import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { PositionContext } from '@/providers/IsPositionProvider'

interface Position {
  positionLat: number
  setPositionLat: Dispatch<SetStateAction<number>>
  positionLng: number
  setPositionLng: Dispatch<SetStateAction<number>>
}
interface Place {
  id: number
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  place_id: string
  name: string
  opening_hours: {
    weekday_text: string[]
    open_now: boolean
  }
  photos: {
    photo_reference: string
  }[]
  vicinity: string
  rating: number
  user_ratings_total: number
  price_level: number
}

export const usePlaces = () => {
  const { positionLat, setPositionLat, positionLng, setPositionLng } =
    useContext(PositionContext) as Position
  const [places, setPlaces] = useState<Place[]>([])
  const [shopName, setShopName] = useState<string>('')
  const [shopPhoto, setShopPhoto] = useState<string>('')
  const [shopOpen, setShopOpen] = useState<boolean>(false)
  const [shopAddress, setShopAddress] = useState<string>('')
  const [shopRating, setShopRating] = useState<number>(0)
  const [shopRatingTotal, setRatingTotal] = useState<number>(0)
  const [shopBusinessHours, setShopBusinessHours] = useState<string[]>([])
  const [placeId, setPlaceId] = useState<string>('')
  const [active, setActive] = useState<string>('')

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
