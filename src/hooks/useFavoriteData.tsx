import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, DocumentData, getDoc } from 'firebase/firestore'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { auth, db } from '../../firebase'

interface UseFavoriteDataProps {
  placeId: string
  setFavState: Dispatch<SetStateAction<boolean>>
  favList: DocumentData[]
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

  const userFavListData = useCallback(
    async (user: User) => {
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
    },
    [placeId, setFavState]
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser((prevUser) => user)
      if (user) {
        userFavListData(user)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [userFavListData])

  return { user }
}
