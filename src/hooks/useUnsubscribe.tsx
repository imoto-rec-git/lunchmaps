import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '../../firebase'

export const useUnsubscribe = ({ setUser, fetchData }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        fetchData(user)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
}
