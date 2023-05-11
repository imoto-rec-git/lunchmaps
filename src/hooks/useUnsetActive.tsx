import React from 'react'

interface useUnsetActiveProps {
  setActive: React.Dispatch<React.SetStateAction<string>>
}

export const useUnsetActive = ({ setActive }: useUnsetActiveProps) => {
  const handleReturn = () => {
    setActive('')
  }
  return { handleReturn }
}
