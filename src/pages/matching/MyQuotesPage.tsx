import { useMyQuotes } from '../../features/matching/hooks/useMatching'
import MyQuotesList from '../../features/matching/components/MyQuotesList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function MyQuotesPage() {
  const { data, isLoading, isError } = useMyQuotes()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur</p></div>

  return <MyQuotesList quotes={data ?? []} />
}
