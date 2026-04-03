import { useMyRequests } from '../../features/matching/hooks/useMatching'
import RequestsList from '../../features/matching/components/RequestsList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function MyRequestsPage() {
  const { data, isLoading, isError } = useMyRequests()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur</p></div>

  return <RequestsList requests={data ?? []} />
}
