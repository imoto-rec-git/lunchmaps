import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import { auth } from '../../firebase'

interface IsAuthContext {
  isAuth: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
}

export const IsAuthContext = createContext<IsAuthContext>({
  isAuth: false,
  setIsAuth: () => {},
})
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
