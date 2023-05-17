import { onAuthStateChanged, User } from 'firebase/auth'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { auth } from '../../firebase'

interface useUnsubscribe {
  setUser: Dispatch<SetStateAction<User | null>>
  fetchData: (user: User) => Promise<void>
}

export const useUnsubscribe = ({ setUser, fetchData }: useUnsubscribe) => {
  const handleAuthStateChanged = useCallback(
    (user: User | null) => {
      setUser(user)
      if (user) {
        fetchData(user)
      }
    },
    [setUser, fetchData]
  )
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged)
    return () => {
      unsubscribe()
    }
  }, [])
}
