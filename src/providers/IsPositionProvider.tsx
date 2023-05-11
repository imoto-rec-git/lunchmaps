import { createContext, ReactNode, useContext, useState } from 'react'

interface PositionContext {
  positionLat: number
  setPositionLat: (value: number) => void
  positionLng: number
  setPositionLng: (value: number) => void
}

export const PositionContext = createContext<PositionContext | undefined>(
  undefined
)
export const usePosition = () => {
  return useContext(PositionContext)
}
export const IsPositionProvider = ({ children }: { children: ReactNode }) => {
  const [positionLat, setPositionLat] = useState(34.691125259452555)
  const [positionLng, setPositionLng] = useState(135.4964441534794)
  return (
    <PositionContext.Provider
      value={{ positionLat, setPositionLat, positionLng, setPositionLng }}
    >
      {children}
    </PositionContext.Provider>
  )
}
