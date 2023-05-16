import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { NextRouter } from 'next/router'
import { auth, db } from '../../firebase'

interface RouterProps {
  router: NextRouter
}

export const useFavoriteDelete = ({ router }: RouterProps) => {
  const handleFavoriteDelete = async (placeId: string) => {
    if (auth.currentUser) {
      // firestoreの特定の要素削除
      const docRef = doc(db, 'users', auth.currentUser.uid)
      try {
        await updateDoc(docRef, {
          favoriteList: arrayRemove(placeId),
        })
        router.reload()
      } catch (error) {
        console.error(error)
      }
    }
  }
  return { handleFavoriteDelete }
}
