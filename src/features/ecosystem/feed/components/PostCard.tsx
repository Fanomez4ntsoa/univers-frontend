import { useState } from 'react'
import type { Post } from '../types/post'
import { POST_TYPE_CONFIG } from '../types/post'
import PostActions from './PostActions'
import CommentsList from './CommentsList'
import { getStoredUser } from '../../../auth/hooks/useAuth'

interface PostCardProps {
  post: Post
  onLike: (id: number) => void
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function Avatar({ name, url }: { name: string; url: string | null }) {
  if (url) return <img src={url} alt={name} className="w-11 h-11 rounded-full object-cover ring-2 ring-white" />
  return (
    <div className="w-11 h-11 rounded-full bg-[#1E40AF]/10 flex items-center justify-center ring-2 ring-white">
      <span className="text-[#1E40AF] font-semibold">{name.charAt(0).toUpperCase()}</span>
    </div>
  )
}

export default function PostCard({ post, onLike, onEdit, onDelete }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const user = getStoredUser()
  const isOwner = user?.id === String(post.user_id)
  const typeBadge = POST_TYPE_CONFIG[post.post_type]

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 transition-all duration-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={post.author.display_name} url={post.author.avatar_url} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-900">{post.author.display_name}</span>
            {post.author.is_verified && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Vérifié</span>}
            {typeBadge && <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadge.color}`}>{typeBadge.label}</span>}
          </div>
          <p className="text-xs text-slate-400">@{post.author.username} · {fmtDate(post.created_at)}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-slate-700 whitespace-pre-wrap mb-3">{post.content}</p>

      {/* Media */}
      {(post.media_urls ?? []).length > 0 && (
        <div className="mb-3 rounded-xl overflow-hidden">
          <img src={post.media_urls[0]} alt="Media" className="w-full aspect-[4/3] object-cover" />
        </div>
      )}

      {/* Actions */}
      <PostActions
        likesCount={post.likes_count}
        commentsCount={post.comments_count}
        isLiked={post.is_liked}
        isOwner={isOwner}
        onLike={() => onLike(post.id)}
        onComment={() => setShowComments(!showComments)}
        onEdit={() => onEdit(post)}
        onDelete={() => onDelete(post.id)}
      />

      {/* Comments */}
      {showComments && (
        <div className="mt-3">
          <CommentsList postId={post.id} />
        </div>
      )}
    </div>
  )
}
