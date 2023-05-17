import { Dispatch, SetStateAction } from 'react'
import { SwipeEventData, useSwipeable } from 'react-swipeable'

export const useBackSwipe = ({
  setActive,
}: {
  setActive: Dispatch<SetStateAction<string>>
}) => {
  const handleBackSwipe = useSwipeable({
    onSwiped: (e: SwipeEventData) => {
      if (e.dir === 'Right') {
        setActive('')
      }
    },
    trackMouse: true,
  })
  return { handleBackSwipe }
}
