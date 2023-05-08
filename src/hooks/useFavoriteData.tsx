import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'

export const useFavoriteData = ({ placeId, setFavState, favList }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userFavListData = async (user: User) => {
      if (placeId) {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        const favList = docSnap.data().favoriteList
        if (favList.includes(placeId)) {
          setFavState(true)
        } else {
          setFavState(false)
        }
      }
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        userFavListData(user)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [placeId, favList])

  return { user }
}
