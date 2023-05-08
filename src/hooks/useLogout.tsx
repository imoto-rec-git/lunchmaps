import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

export const useLogout = ({ setIsAuth, router }) => {
  const handleLogoutDialogClose = () => {
    const logoutModal: HTMLDialogElement = document.querySelector('#logout')
    logoutModal.close()
  }
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false)
        router.reload()
      })
      .catch((error) => console.log(error))
    handleLogoutDialogClose()
  }

  return { handleLogoutDialogClose, handleLogout }
}
