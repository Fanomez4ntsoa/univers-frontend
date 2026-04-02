import { useParams } from 'react-router-dom'
import { usePortalQuote } from '../../features/portal/hooks/usePortal'
import PortalQuoteDetail from '../../features/portal/components/PortalQuoteDetail'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function PortalQuotePage() {
  const { token, id } = useParams<{ token: string; id: string }>()
  const { data, isLoading, isError } = usePortalQuote(token!, Number(id))

  if (isLoading) return <Shell><PageSkeleton /></Shell>
  if (isError || !data) return <Shell><p className="text-center py-16 text-red-500">Devis introuvable</p></Shell>

  return (
    <Shell>
      <PortalQuoteDetail quote={data} token={token!} />
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8">
        {children}
      </div>
    </div>
  )
}
