import { useParams } from 'react-router-dom'
import { usePortalDashboard } from '../../features/portal/hooks/usePortal'
import PortalDashboard from '../../features/portal/components/PortalDashboard'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function PortalPage() {
  const { token } = useParams<{ token: string }>()
  const { data, isLoading, isError } = usePortalDashboard(token!)

  if (isLoading) return <PortalShell><PageSkeleton /></PortalShell>
  if (isError || !data) return <PortalShell><p className="text-center py-16 text-red-500">Portail introuvable ou lien invalide</p></PortalShell>

  return (
    <PortalShell>
      <PortalDashboard data={data} token={token!} />
    </PortalShell>
  )
}

function PortalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8">
        {children}
      </div>
    </div>
  )
}
