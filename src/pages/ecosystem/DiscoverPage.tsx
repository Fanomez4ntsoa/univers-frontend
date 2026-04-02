import { Compass } from 'lucide-react'
import { useDiscover } from '../../features/ecosystem/social/hooks/useSocial'
import DiscoverList from '../../features/ecosystem/social/components/DiscoverList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function DiscoverPage() {
  const { data, isLoading, isError } = useDiscover()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur lors du chargement</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Compass className="w-6 h-6 text-[#1E40AF]" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Découvrir</h1>
          <p className="text-slate-500 text-sm">Trouve des artisans près de chez toi</p>
        </div>
      </div>
      <DiscoverList users={data ?? []} />
    </div>
  )
}
