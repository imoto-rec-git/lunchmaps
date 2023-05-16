import { createContext, ReactNode, useContext, useState } from 'react'

interface FirstLoadingContext {
  isfirstLoading: boolean
  setIsFirstLoading: (value: boolean) => void
}

export const FirstLoadingContext = createContext<
  FirstLoadingContext | undefined
>(undefined)
export const useFirstLoading = () => {
  const context = useContext(FirstLoadingContext)
  if (context === undefined) {
    throw new Error(
      'useFirstLoading must be used within a FirstLoadingProvider'
    )
  }
  return context
}
export const FirstLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isfirstLoading, setIsFirstLoading] = useState(true)
  return (
    <FirstLoadingContext.Provider value={{ isfirstLoading, setIsFirstLoading }}>
      {children}
    </FirstLoadingContext.Provider>
  )
}
