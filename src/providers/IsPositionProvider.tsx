import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

interface PositionContext {
  positionLat: number
  setPositionLat: Dispatch<SetStateAction<number>>
  positionLng: number
  setPositionLng: Dispatch<SetStateAction<number>>
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
  const value: PositionContext = {
    positionLat,
    setPositionLat,
    positionLng,
    setPositionLng,
  }
  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  )
}
