import { Store } from 'lucide-react'
import { useShops } from '../../features/ecosystem/shops/hooks/useShops'
import ShopsList from '../../features/ecosystem/shops/components/ShopsList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function ShopsPage() {
  const { data, isLoading, isError } = useShops()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Store className="w-6 h-6 text-[#1E40AF]" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Boutiques</h1>
          <p className="text-slate-500 text-sm">Découvre les boutiques des artisans</p>
        </div>
      </div>
      <ShopsList shops={data ?? []} />
    </div>
  )
}
