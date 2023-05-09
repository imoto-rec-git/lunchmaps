import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'

export const useFavoriteFetchData = ({ setUserFavShopList }) => {
  const [user, setUser] = useState(null)

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
        const fetchedData = []
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
