import { signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { NextRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { auth, db, googleProvider } from '../../firebase'

interface useGoogleAuthProps {
  setIsAuth: Dispatch<SetStateAction<boolean>>
  router: NextRouter
}

export const useGoogleAuth = ({ setIsAuth, router }: useGoogleAuthProps) => {
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        if (auth.currentUser) {
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
        }
      })
      .catch((error) => console.log(error))
  }
  return { loginWithGoogle }
}
