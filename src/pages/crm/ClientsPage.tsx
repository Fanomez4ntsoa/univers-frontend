import { useState } from 'react'
import { useClients } from '../../features/crm/clients/hooks/useClients'
import ClientsList from '../../features/crm/clients/components/ClientsList'
import ClientDetail from '../../features/crm/clients/components/ClientDetail'
import PageSkeleton from '../../shared/components/PageSkeleton'
import type { Client } from '../../shared/types/crm'

export default function ClientsPage() {
  const { data, isLoading, isError } = useClients()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  if (isLoading) return <PageSkeleton />

  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Erreur lors du chargement des clients</p>
      </div>
    )
  }

  if (selectedId) {
    return <ClientDetail clientId={selectedId} onBack={() => setSelectedId(null)} />
  }

  return (
    <ClientsList
      data={data ?? []}
      onSelectClient={(client: Client) => setSelectedId(client.id)}
    />
  )
}
