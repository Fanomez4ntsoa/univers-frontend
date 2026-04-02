import { Link } from 'react-router-dom'
import { MapPin, Briefcase, Users } from 'lucide-react'
import type { DiscoverUser } from '../types/social'
import FollowButton from './FollowButton'

interface ArtisanCardProps {
  user: DiscoverUser
}

function Avatar({ name, url }: { name: string; url: string | null }) {
  if (url) return <img src={url} alt={name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white" />
  return (
    <div className="w-14 h-14 rounded-full bg-[#1E40AF]/10 flex items-center justify-center ring-2 ring-white">
      <span className="text-[#1E40AF] text-lg font-semibold">{name.charAt(0).toUpperCase()}</span>
    </div>
  )
}

export default function ArtisanCard({ user }: ArtisanCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4">
        <Link to={`/profile/${user.id}`}>
          <Avatar name={user.display_name} url={user.avatar_url} />
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/profile/${user.id}`} className="hover:underline">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 truncate">{user.display_name}</span>
              {user.is_verified && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Vérifié</span>}
            </div>
          </Link>
          {user.metier && (
            <p className="text-sm text-[#1E40AF] flex items-center gap-1 mt-0.5"><Briefcase className="w-3 h-3" />{user.metier}</p>
          )}
          {user.city && (
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{user.city}</p>
          )}
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Users className="w-3 h-3" />{user.followers_count} abonnés</p>
        </div>
        <FollowButton userId={user.id} isFollowing={user.is_following} />
      </div>
    </div>
  )
}
