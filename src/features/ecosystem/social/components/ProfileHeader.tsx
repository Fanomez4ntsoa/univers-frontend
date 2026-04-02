import { MapPin, Briefcase, CheckCircle } from 'lucide-react'
import type { UserProfile } from '../types/social'
import FollowButton from './FollowButton'
import { getStoredUser } from '../../../auth/hooks/useAuth'

interface ProfileHeaderProps {
  profile: UserProfile
}

function Avatar({ name, url }: { name: string; url: string | null }) {
  if (url) return <img src={url} alt={name} className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg" />
  return (
    <div className="w-24 h-24 rounded-full bg-[#1E40AF]/10 flex items-center justify-center ring-4 ring-white shadow-lg">
      <span className="text-[#1E40AF] text-3xl font-bold">{name.charAt(0).toUpperCase()}</span>
    </div>
  )
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const currentUser = getStoredUser()
  const isOwnProfile = currentUser?.id === String(profile.id)

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]" />

      {/* Profile info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
          <Avatar name={profile.display_name} url={profile.avatar_url} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{profile.display_name}</h1>
              {profile.is_verified && <CheckCircle className="w-5 h-5 text-blue-500" />}
            </div>
            <p className="text-sm text-slate-400">@{profile.username}</p>
            {profile.metier && (
              <p className="text-sm text-[#1E40AF] flex items-center gap-1 mt-1"><Briefcase className="w-4 h-4" />{profile.metier}</p>
            )}
            {profile.city && (
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-4 h-4" />{profile.city}</p>
            )}
          </div>
          {!isOwnProfile && (
            <FollowButton userId={profile.id} isFollowing={profile.is_following} />
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-sm text-slate-600 mt-4 whitespace-pre-wrap">{profile.bio}</p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
          <div className="text-center">
            <p className="text-xl font-bold text-slate-900">{profile.posts_count}</p>
            <p className="text-xs text-slate-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-slate-900">{profile.followers_count}</p>
            <p className="text-xs text-slate-500">Abonnés</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-slate-900">{profile.following_count}</p>
            <p className="text-xs text-slate-500">Abonnements</p>
          </div>
        </div>
      </div>
    </div>
  )
}
