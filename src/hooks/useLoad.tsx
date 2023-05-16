import React, { useEffect, useState } from 'react'

interface useLoadProps {
  isfirstLoading: boolean
  setIsFirstLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const useLoad = ({
  isfirstLoading,
  setIsFirstLoading,
}: useLoadProps) => {
  const [Load, setLoad] = useState('load')

  useEffect(() => {
    if (isfirstLoading) {
      setTimeout(() => {
        setLoad('loaded')
      }, 3000)
      setTimeout(() => {
        setLoad('loadNone')
      }, 3800)
      setIsFirstLoading(false)
    } else {
      setLoad('loadNone')
      setIsFirstLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { Load }
}
