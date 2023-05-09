import { useEffect } from 'react'
import { auth } from '../../firebase'

export const useUserData = ({ setUserEmail, setIsGoogleSignIn }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
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
