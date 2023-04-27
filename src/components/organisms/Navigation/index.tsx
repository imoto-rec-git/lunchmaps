import React, { useContext } from 'react'
import { IsAuthContext } from '@/providers/IsAuthProvider'
import { useRouter } from 'next/router'
import { LogoutDialog } from '@/components/molecules/LogoutDialog'
import { Menu } from '@/components/molecules/Menu'

export const Navigation = () => {
  const { isAuth, setIsAuth } = useContext(IsAuthContext)
  const router = useRouter()

  return (
    <>
      <LogoutDialog setIsAuth={setIsAuth} router={router} />
      <Menu isAuth={isAuth} router={router} />
    </>
  )
}
