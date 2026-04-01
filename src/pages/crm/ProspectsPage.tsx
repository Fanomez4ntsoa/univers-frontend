import { useProspects } from '../../features/crm/prospects/hooks/useProspects'
import ProspectsList from '../../features/crm/prospects/components/ProspectsList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function ProspectsPage() {
  const { data, isLoading, isError } = useProspects()

  if (isLoading) return <PageSkeleton />

  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Erreur lors du chargement des prospects</p>
      </div>
    )
  }

  return <ProspectsList data={data ?? []} />
}
