import { useParams } from 'react-router-dom'
import { useShop } from '../../features/ecosystem/shops/hooks/useShops'
import ShopDetail from '../../features/ecosystem/shops/components/ShopDetail'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function ShopDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError } = useShop(slug)

  if (isLoading) return <PageSkeleton />
  if (isError || !data) return <div className="text-center py-16"><p className="text-red-500">Boutique introuvable</p></div>

  return <ShopDetail shop={data} />
}
