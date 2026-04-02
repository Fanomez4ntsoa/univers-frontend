import { Heart, MessageCircle, Edit, Trash2 } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { requireAuth } from '../../../../shared/lib/requireAuth'

interface PostActionsProps {
  likesCount: number
  commentsCount: number
  isLiked: boolean
  isOwner: boolean
  onLike: () => void
  onComment: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function PostActions({ likesCount, commentsCount, isLiked, isOwner, onLike, onComment, onEdit, onDelete }: PostActionsProps) {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
      <div className="flex items-center gap-4">
        <button onClick={onLike} className="flex items-center gap-1.5 text-sm transition-colors">
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-400'}`} />
          <span className={isLiked ? 'text-red-500 font-medium' : 'text-slate-500'}>{likesCount}</span>
        </button>
        <button onClick={onComment} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#1E40AF] transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-slate-500">{commentsCount}</span>
        </button>
      </div>
      {isOwner && (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={() => requireAuth(onEdit)} title="Modifier"><Edit className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={() => requireAuth(onDelete)} title="Supprimer" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
        </div>
      )}
    </div>
  )
}
