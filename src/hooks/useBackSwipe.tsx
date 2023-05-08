import { useSwipeable } from 'react-swipeable'

export const useBackSwipe = ({ setActive }) => {
  const handleBackSwipe = useSwipeable({
    onSwiped: (e) => {
      if (e.dir === 'Right') {
        setActive('')
      }
    },
    trackMouse: true,
  })
  return { handleBackSwipe }
}
