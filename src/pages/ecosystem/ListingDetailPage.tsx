import { useParams } from 'react-router-dom'
import { useListing } from '../../features/ecosystem/listings/hooks/useListings'
import ListingDetail from '../../features/ecosystem/listings/components/ListingDetail'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useListing(Number(id))

  if (isLoading) return <PageSkeleton />
  if (isError || !data) return <div className="text-center py-16"><p className="text-red-500">Annonce introuvable</p></div>

  return <ListingDetail listing={data} />
}
