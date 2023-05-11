import {
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { NextRouter } from 'next/router'
import { auth, db } from '../../firebase'

interface UseFavoriteAddProps {
  setFavList: React.Dispatch<React.SetStateAction<DocumentData[]>>
  router: NextRouter
  placeId: string
}

export const useFavoriteAdd = ({
  setFavList,
  router,
  placeId,
}: UseFavoriteAddProps) => {
  const handleFavoritAdd = async () => {
    if (auth.currentUser) {
      const docRef = doc(db, 'users', auth.currentUser.uid)
      // fireStore書き込み
      const washing = async () => {
        await updateDoc(docRef, {
          favoriteList: arrayUnion(placeId),
        })
      }
      washing()
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const favList = docSnap.data()?.favoriteList as DocumentData[]
        setFavList(favList)
        router.push('./favorite')
      }
    }
  }
  return { handleFavoritAdd }
}
