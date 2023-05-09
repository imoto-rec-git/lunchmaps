import { FirstLoadingContext } from '@/providers/IsFirstLoadingProvider'
import { useContext, useEffect } from 'react'

export const useLoadCheck = () => {
  const { setIsFirstLoading } = useContext(FirstLoadingContext)
  useEffect(() => {
    setIsFirstLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
