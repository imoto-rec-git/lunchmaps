import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

export const useFavoriteAdd = ({ setFavList, router, placeId }) => {
  const handleFavoritAdd = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid)
    // fireStore書き込み
    const washing = async () => {
      await updateDoc(docRef, {
        favoriteList: arrayUnion(placeId),
      })
    }
    washing()
    const docSnap = await getDoc(docRef)
    const favList = docSnap.data().favoriteList
    setFavList(favList)
    router.push('./favorite')
  }
  return { handleFavoritAdd }
}
