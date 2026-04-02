export interface UserProfile {
  id: number
  username: string
  display_name: string
  avatar_url: string | null
  bio: string | null
  metier: string | null
  city: string | null
  is_verified: boolean
  is_following: boolean
  posts_count: number
  followers_count: number
  following_count: number
}

export interface FollowStats {
  id: number
  username: string
  display_name: string
  avatar_url: string | null
  is_verified: boolean
}

export interface DiscoverUser {
  id: number
  username: string
  display_name: string
  avatar_url: string | null
  metier: string | null
  city: string | null
  is_verified: boolean
  is_following: boolean
  followers_count: number
}
