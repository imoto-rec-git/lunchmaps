import { createContext, useContext, useState } from 'react'

export const FirstLoadingContext = createContext(undefined)
export const useFirstLoading = () => {
  return useContext(FirstLoadingContext)
}
export const FirstLoadingProvider = ({ children }) => {
  const [isfirstLoading, setIsFirstLoading] = useState(true)
  return (
    <FirstLoadingContext.Provider value={{ isfirstLoading, setIsFirstLoading }}>
      {children}
    </FirstLoadingContext.Provider>
  )
}
