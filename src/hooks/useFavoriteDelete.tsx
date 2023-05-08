import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

export const useFavoriteDelete = ({ router }) => {
  const handleFavoriteDelete = async (placeId: string) => {
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
  return { handleFavoriteDelete }
}
