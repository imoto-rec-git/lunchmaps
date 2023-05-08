import { useEffect, useState } from 'react'

export const useLoad = ({ isfirstLoading, setIsFirstLoading }) => {
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
