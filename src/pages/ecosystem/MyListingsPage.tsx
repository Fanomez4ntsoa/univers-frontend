import { ShoppingBag } from 'lucide-react'
import { useMyListings } from '../../features/ecosystem/listings/hooks/useListings'
import MyListingsList from '../../features/ecosystem/listings/components/MyListingsList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function MyListingsPage() {
  const { data, isLoading, isError } = useMyListings()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ShoppingBag className="w-6 h-6 text-[#1E40AF]" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes annonces</h1>
          <p className="text-slate-500 text-sm">Gère tes petites annonces</p>
        </div>
      </div>
      <MyListingsList listings={data ?? []} />
    </div>
  )
}
