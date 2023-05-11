import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'

interface UseFavoriteDataProps {
  placeId: string
  setFavState: React.Dispatch<React.SetStateAction<boolean>>
  favList: string[]
}
interface UserDocData {
  favoriteList: string[]
}

export const useFavoriteData = ({
  placeId,
  setFavState,
  favList,
}: UseFavoriteDataProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userFavListData = async (user: User) => {
      if (placeId) {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        const userData = docSnap.data() as UserDocData
        const favList = userData.favoriteList
        if (favList.includes(placeId)) {
          setFavState(true)
        } else {
          setFavState(false)
        }
      }
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser((prevUser) => user)
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
