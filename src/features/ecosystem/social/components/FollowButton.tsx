import { useState } from 'react'
import { UserPlus, UserCheck } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { requireAuth } from '../../../../shared/lib/requireAuth'
import { useFollowUser } from '../hooks/useSocial'

interface FollowButtonProps {
  userId: number
  isFollowing: boolean
}

export default function FollowButton({ userId, isFollowing }: FollowButtonProps) {
  const [localFollowing, setLocalFollowing] = useState(isFollowing)
  const followMutation = useFollowUser()

  const handleClick = () => {
    requireAuth(() => {
      setLocalFollowing(!localFollowing)
      followMutation.mutate(userId)
    })
  }

  return (
    <Button
      onClick={handleClick}
      disabled={followMutation.isPending}
      variant={localFollowing ? 'outline' : 'default'}
      className={`rounded-lg cursor-pointer ${localFollowing ? '' : 'bg-[#1E40AF] hover:bg-blue-800 text-white'}`}
    >
      {localFollowing ? <><UserCheck className="w-4 h-4 mr-1.5" /> Suivi ✓</> : <><UserPlus className="w-4 h-4 mr-1.5" /> Suivre</>}
    </Button>
  )
}
