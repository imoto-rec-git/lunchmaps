import React, { createContext, ReactNode, useState } from 'react'
import { auth } from '../../firebase'

interface IsAuthContext {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const IsAuthContext = createContext<IsAuthContext | undefined>(undefined)
export const IsAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false)

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  })
  return (
    <>
      <IsAuthContext.Provider value={{ isAuth, setIsAuth }}>
        {children}
      </IsAuthContext.Provider>
    </>
  )
}
