import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, DocumentData, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'

interface UseFavoriteFetchDataProps {
  setUserFavShopList: React.Dispatch<React.SetStateAction<DocumentData[]>>
}
interface Periods {
  close: {
    day: number
    time: string
  }
  open: {
    day: number
    time: string
  }
}
interface OpeningHours {
  open_now: boolean
  periods: Periods[]
  weekday_text: string[]
}
interface Photos {
  height: number
  html_attributions: string[]
  photo_reference: string
  width: number
}
interface ShopData {
  name: string
  opening_hours: OpeningHours[]
  photos: Photos[]
  place_id: string
  rating: number
  user_ratings_total: number
  vicinity: string
}

export const useFavoriteFetchData = ({
  setUserFavShopList,
}: UseFavoriteFetchDataProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        fetchData(user)
      }
    })
    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const fetchData = async (user: User) => {
    // fireStore読み込み
    const userFavListData = async () => {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists() && docSnap.data().favoriteList) {
        const fetchedData: Array<ShopData> = []
        for (let i = 0; i < docSnap.data().favoriteList.length; i++) {
          const res = await fetch(
            `/api/details?place_id=${docSnap.data().favoriteList[i]}`
          )
          const data = await res.json()
          fetchedData.push(data.result)
        }
        setUserFavShopList(fetchedData)
      } else {
        console.log('No such document!')
      }
    }
    userFavListData()
  }
}
