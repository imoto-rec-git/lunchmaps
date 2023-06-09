import { signOut } from 'firebase/auth'
import { NextRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { auth } from '../../firebase'

interface useLogoutProps {
  setIsAuth: Dispatch<SetStateAction<boolean>>
  router: NextRouter
}

export const useLogout = ({ setIsAuth, router }: useLogoutProps) => {
  const handleLogoutDialogClose = () => {
    const logoutModal: HTMLDialogElement | null =
      document.querySelector('#logout')
    if (logoutModal) {
      logoutModal.close()
    }
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
