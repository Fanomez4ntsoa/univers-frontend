export interface User {
  id: string
  email: string
  name: string
  role: string
  user_type: 'particulier' | 'professionnel'
  is_active: boolean
}

export interface Profile {
  id: string
  user_id: string
  email: string
  username: string
  display_name: string
  user_type: 'particulier' | 'professionnel'
  profile_photo: string | null
  bio: string | null
  city: string | null
  company_name: string | null
  metier: string | null
  is_verified: boolean
  identity_status: string
  role: string
  has_pro_subscription: boolean
  shop_enabled: boolean
}

export interface LoginResponse {
  token: string
  user: User
  profile: Profile
}
