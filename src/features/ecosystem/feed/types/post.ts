export interface PostAuthor {
  id: number
  username: string
  display_name: string
  avatar_url: string | null
  is_verified: boolean
}

export interface PostComment {
  id: number
  user_id: number
  author: PostAuthor
  content: string
  created_at: string
}

export interface Post {
  id: number
  user_id: number
  author: PostAuthor
  content: string
  post_type: PostType
  media_urls: string[]
  likes_count: number
  comments_count: number
  is_liked: boolean
  created_at: string
  updated_at: string
}

export type PostType = 'text' | 'photo' | 'video' | 'chantier'

export const POST_TYPE_CONFIG: Record<PostType, { label: string; color: string } | null> = {
  text: null,
  photo: { label: 'Photo', color: 'bg-blue-100 text-blue-700' },
  video: { label: 'Vidéo', color: 'bg-purple-100 text-purple-700' },
  chantier: { label: 'Chantier', color: 'bg-orange-100 text-[#F97316]' },
}
