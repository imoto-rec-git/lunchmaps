import { onAuthStateChanged, User } from 'firebase/auth'
import React, { useCallback, useEffect } from 'react'
import { auth } from '../../firebase'

interface useUnsubscribe {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
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
