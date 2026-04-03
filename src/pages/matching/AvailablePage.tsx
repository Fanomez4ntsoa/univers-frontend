import { Search } from 'lucide-react'
import { useAvailableRequests } from '../../features/matching/hooks/useMatching'
import AvailableRequestsList from '../../features/matching/components/AvailableRequestsList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function AvailablePage() {
  const { data, isLoading, isError } = useAvailableRequests()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Search className="w-6 h-6 text-[#1E40AF]" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Demandes disponibles</h1>
          <p className="text-slate-500 text-sm">Des particuliers cherchent un artisan — soumets ton devis</p>
        </div>
      </div>
      <AvailableRequestsList requests={data ?? []} />
    </div>
  )
}
