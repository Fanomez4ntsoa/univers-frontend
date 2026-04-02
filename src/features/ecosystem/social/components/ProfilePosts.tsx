import { Rss } from 'lucide-react'
import type { Post } from '../../feed/types/post'

interface ProfilePostsProps {
  posts: Post[]
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

export default function ProfilePosts({ posts }: ProfilePostsProps) {
  if ((posts ?? []).length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <Rss className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-sm text-slate-400">Aucun post publié</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">Derniers posts</h2>
      <div className="space-y-3">
        {(posts ?? []).slice(0, 5).map((post) => (
          <div key={post.id} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-700 whitespace-pre-wrap line-clamp-3">{post.content}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <span>{fmtDate(post.created_at)}</span>
              <span>♥ {post.likes_count}</span>
              <span>💬 {post.comments_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
