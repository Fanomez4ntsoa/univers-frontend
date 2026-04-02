import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useAddComment } from '../hooks/useFeed'
import { requireAuth } from '../../../../shared/lib/requireAuth'

interface CommentFormProps {
  postId: number
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('')
  const addComment = useAddComment()

  const handleSubmit = () => {
    if (!content.trim()) return
    requireAuth(() => addComment.mutate(
      { postId, content },
      { onSuccess: () => { setContent(''); toast.success('Commentaire ajouté') }, onError: () => toast.error('Erreur') }
    ))
  }

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Ajouter un commentaire..."
        className="h-10 rounded-xl text-sm"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <Button onClick={handleSubmit} disabled={!content.trim() || addComment.isPending} size="sm" className="bg-[#1E40AF] text-white rounded-lg cursor-pointer h-10 px-3">
        <Send className="w-4 h-4" />
      </Button>
    </div>
  )
}
