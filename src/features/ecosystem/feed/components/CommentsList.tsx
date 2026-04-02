import { usePostComments } from '../hooks/useFeed'
import type { PostComment } from '../types/post'
import CommentForm from './CommentForm'

interface CommentsListProps {
  postId: number
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function Avatar({ name, url }: { name: string; url: string | null }) {
  if (url) return <img src={url} alt={name} className="w-8 h-8 rounded-full object-cover" />
  return (
    <div className="w-8 h-8 rounded-full bg-[#1E40AF]/10 flex items-center justify-center">
      <span className="text-[#1E40AF] text-xs font-semibold">{name.charAt(0).toUpperCase()}</span>
    </div>
  )
}

export default function CommentsList({ postId }: CommentsListProps) {
  const { data: comments } = usePostComments(postId)

  return (
    <div className="space-y-3 pt-3 border-t border-slate-100">
      {(comments ?? []).length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-2">Aucun commentaire</p>
      ) : (
        (comments ?? []).map((c: PostComment) => (
          <div key={c.id} className="flex gap-2">
            <Avatar name={c.author.display_name} url={c.author.avatar_url} />
            <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-900">{c.author.display_name}</span>
                <span className="text-xs text-slate-400">{fmtDate(c.created_at)}</span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">{c.content}</p>
            </div>
          </div>
        ))
      )}
      <CommentForm postId={postId} />
    </div>
  )
}
