import { useState } from 'react'
import { Plus, Rss, Users } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import type { Post } from '../types/post'
import { useLikePost, useDeletePost } from '../hooks/useFeed'
import PostCard from './PostCard'
import PostForm from './PostForm'

interface PostsListProps {
  posts: Post[]
  isFeed?: boolean
}

export default function PostsList({ posts, isFeed }: PostsListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [visibleCount, setVisibleCount] = useState(10)

  const likeMutation = useLikePost()
  const deleteMutation = useDeletePost()

  const handleDelete = (id: number) => {
    if (!confirm('Supprimer ce post ?')) return
    deleteMutation.mutate(id, { onSuccess: () => toast.success('Post supprimé'), onError: () => toast.error('Erreur') })
  }

  const handleEdit = (post: Post) => { setEditingPost(post); setFormOpen(true) }
  const handleCreate = () => { setEditingPost(null); setFormOpen(true) }

  const visible = posts.slice(0, visibleCount)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-end">
        <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
          <Plus className="w-5 h-5 mr-2" /> Nouveau post
        </Button>
      </div>

      {/* Empty state */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          {isFeed ? (
            <>
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Ton feed est vide</h3>
              <p className="text-sm text-slate-500 mb-4">Suis des artisans pour voir leurs publications ici</p>
            </>
          ) : (
            <>
              <Rss className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">Aucun post pour le moment</p>
              <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
                <Plus className="w-4 h-4 mr-2" /> Créer le premier post
              </Button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {visible.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={(id) => likeMutation.mutate(id)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {visibleCount < posts.length && (
            <div className="text-center">
              <Button variant="outline" onClick={() => setVisibleCount((v) => v + 10)} className="rounded-lg">
                Charger plus
              </Button>
            </div>
          )}
        </>
      )}

      <PostForm open={formOpen} onClose={() => setFormOpen(false)} post={editingPost} />
    </div>
  )
}
