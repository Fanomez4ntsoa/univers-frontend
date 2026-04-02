import { useState, useEffect, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import { useCreatePost, useUpdatePost } from '../hooks/useFeed'
import type { Post, PostType } from '../types/post'
import { POST_TYPE_CONFIG } from '../types/post'
import type { AxiosError } from 'axios'

interface PostFormProps {
  open: boolean
  onClose: () => void
  post?: Post | null
}

export default function PostForm({ open, onClose, post }: PostFormProps) {
  const isEdit = !!post
  const createMutation = useCreatePost()
  const updateMutation = useUpdatePost()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [content, setContent] = useState('')
  const [postType, setPostType] = useState<PostType>('text')

  useEffect(() => {
    if (post) {
      setContent(post.content)
      setPostType(post.post_type)
    } else {
      setContent('')
      setPostType('text')
    }
  }, [post, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!content.trim()) { toast.error('Le contenu est obligatoire'); return }

    const onError = (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>
      toast.error(axiosError.response?.data?.message ?? 'Une erreur est survenue')
    }

    if (isEdit) {
      updateMutation.mutate({ id: post.id, content, post_type: postType }, {
        onSuccess: () => { toast.success('Post mis à jour'); onClose() }, onError,
      })
    } else {
      createMutation.mutate({ content, post_type: postType }, {
        onSuccess: () => { toast.success('Post publié'); onClose() }, onError,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle>{isEdit ? 'Modifier le post' : 'Nouveau post'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
            <div className="flex gap-2">
              {(Object.entries(POST_TYPE_CONFIG) as [PostType, { label: string; color: string } | null][]).map(([type, config]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPostType(type)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    postType === type
                      ? 'bg-[#1E40AF] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {config?.label ?? 'Texte'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contenu *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Partage quelque chose avec ta communauté..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              {isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Publier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
