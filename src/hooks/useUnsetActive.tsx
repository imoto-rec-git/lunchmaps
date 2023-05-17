import { Dispatch, SetStateAction } from 'react'

interface useUnsetActiveProps {
  setActive: Dispatch<SetStateAction<string>>
}

export const useUnsetActive = ({ setActive }: useUnsetActiveProps) => {
  const handleReturn = () => {
    setActive('')
  }
  return { handleReturn }
}
