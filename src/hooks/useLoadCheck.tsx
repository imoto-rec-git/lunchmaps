import { FirstLoadingContext } from '@/providers/IsFirstLoadingProvider'
import { useContext, useEffect } from 'react'
interface setIsFirstLoading {
  setIsFirstLoading: (value: boolean) => void
}
export const useLoadCheck = () => {
  const { setIsFirstLoading } = useContext(
    FirstLoadingContext
  ) as setIsFirstLoading
  useEffect(() => {
    setIsFirstLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
