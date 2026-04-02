import { useParams } from 'react-router-dom'
import { useUserProfile } from '../../features/ecosystem/social/hooks/useSocial'
import ProfileHeader from '../../features/ecosystem/social/components/ProfileHeader'
import ProfilePosts from '../../features/ecosystem/social/components/ProfilePosts'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useUserProfile(Number(id))

  if (isLoading) return <PageSkeleton />
  if (isError || !data?.user) return <div className="text-center py-16"><p className="text-red-500">Profil introuvable</p></div>

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <ProfileHeader profile={data.user} />
      <ProfilePosts posts={data.posts ?? []} />
    </div>
  )
}
