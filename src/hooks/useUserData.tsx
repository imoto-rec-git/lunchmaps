import { Dispatch, SetStateAction, useEffect } from 'react'
import { auth } from '../../firebase'

interface useUserData {
  setUserEmail: Dispatch<SetStateAction<string>>
  setIsGoogleSignIn: Dispatch<SetStateAction<boolean>>
}

export const useUserData = ({
  setUserEmail,
  setIsGoogleSignIn,
}: useUserData) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        setUserEmail(user.email)
        setIsGoogleSignIn(user.providerData[0].providerId === 'google.com')
      } else {
        setUserEmail('')
      }
    })
    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
