export const useUnsetActive = ({ setActive }) => {
  const handleReturn = () => {
    setActive('')
  }
  return { handleReturn }
}
