import { UserPlus, UserCheck } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { requireAuth } from '../../../../shared/lib/requireAuth'
import { useFollowUser } from '../hooks/useSocial'
import { toast } from 'sonner'

interface FollowButtonProps {
  userId: number
  isFollowing: boolean
}

export default function FollowButton({ userId, isFollowing }: FollowButtonProps) {
  const followMutation = useFollowUser()

  const handleClick = () => {
    requireAuth(() =>
      followMutation.mutate(userId, {
        onSuccess: () => toast.success(isFollowing ? 'Désabonné' : 'Abonné'),
        onError: () => toast.error('Erreur'),
      })
    )
  }

  return (
    <Button
      onClick={handleClick}
      disabled={followMutation.isPending}
      variant={isFollowing ? 'outline' : 'default'}
      className={`rounded-lg cursor-pointer ${isFollowing ? '' : 'bg-[#1E40AF] hover:bg-blue-800 text-white'}`}
    >
      {isFollowing ? <><UserCheck className="w-4 h-4 mr-1.5" /> Suivi ✓</> : <><UserPlus className="w-4 h-4 mr-1.5" /> Suivre</>}
    </Button>
  )
}
