import { ShoppingBag } from 'lucide-react'
import { useListings } from '../../features/ecosystem/listings/hooks/useListings'
import ListingsList from '../../features/ecosystem/listings/components/ListingsList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function ListingsPage() {
  const { data, isLoading, isError } = useListings()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ShoppingBag className="w-6 h-6 text-[#1E40AF]" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Annonces</h1>
          <p className="text-slate-500 text-sm">Matériel, outillage et équipements entre artisans</p>
        </div>
      </div>
      <ListingsList listings={data ?? []} />
    </div>
  )
}
