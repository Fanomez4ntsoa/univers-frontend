export const clearAuthStorage = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('profile')
}
