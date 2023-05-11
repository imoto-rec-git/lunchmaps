import { onAuthStateChanged, User } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../../firebase'

interface useUnsubscribe {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  fetchData: (user: User) => Promise<void>
}

export const useUnsubscribe = ({ setUser, fetchData }: useUnsubscribe) => {
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
