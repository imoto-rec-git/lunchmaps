export const useLogoutDialogOpen = () => {
  const handleLogoutDialogOpen = () => {
    const logoutModal: HTMLDialogElement | null =
      document.querySelector('#logout')
    logoutModal && logoutModal.showModal()
  }
  const loginAlert = () => {
    alert('ログインすることで、ご利用できます。')
  }
  return { handleLogoutDialogOpen, loginAlert }
}
