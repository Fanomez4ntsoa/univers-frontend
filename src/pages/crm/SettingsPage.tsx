import { Settings } from 'lucide-react'
import { useSettings } from '../../features/crm/settings/hooks/useSettings'
import SettingsForm from '../../features/crm/settings/components/SettingsForm'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function SettingsPage() {
  const { data, isLoading, isError } = useSettings()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur lors du chargement des paramètres</p></div>
  if (!data) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-[#1E40AF]" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
          <p className="text-slate-500 text-sm">Configure ton entreprise et tes documents</p>
        </div>
      </div>

      <SettingsForm settings={data} />
    </div>
  )
}
