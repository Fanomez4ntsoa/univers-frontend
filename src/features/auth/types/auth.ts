export interface User {
  id: string
  email: string
  username: string
  display_name: string
  role: string
  user_type: 'particulier' | 'professionnel'
  is_active: boolean
}

export interface LoginResponse {
  token: string
  user: User
}
