import { signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../../firebase'
export const useGoogleAuth = ({ setIsAuth, router }) => {
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        const uid = auth.currentUser.uid
        const docRef = doc(db, `users/${uid}`)
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setIsAuth(true)
              router.push('/')
            } else {
              setDoc(docRef, {
                favoriteList: [],
              })
                .then(() => {
                  setIsAuth(true)
                  router.push('/')
                })
                .catch((error) => console.log(error))
            }
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }
  return { loginWithGoogle }
}
