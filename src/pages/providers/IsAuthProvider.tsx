import React, { createContext, useState } from "react"
import { auth } from "../../../firebase"

export const IsAuthContext = createContext(undefined)

export const IsAuthProvider = ({ children }) => {
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
