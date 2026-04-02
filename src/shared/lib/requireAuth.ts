import { toast } from 'sonner'

export const requireAuth = (action: () => void): void => {
  if (!localStorage.getItem('token')) {
    toast.error('Connecte-toi pour effectuer cette action')
    return
  }
  action()
}
