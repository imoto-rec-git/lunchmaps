import { createContext, useContext, useState } from 'react'

export const PositionContext = createContext(undefined)
export const usePosition = () => {
  return useContext(PositionContext)
}
export const IsPositionProvider = ({ children }) => {
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
