import { useState } from 'react'
import { List, LayoutGrid } from 'lucide-react'
import { useChantiers } from '../../features/crm/chantiers/hooks/useChantiers'
import ChantiersList from '../../features/crm/chantiers/components/ChantiersList'
import ChantierKanban from '../../features/crm/chantiers/components/ChantierKanban'
import ChantierDetail from '../../features/crm/chantiers/components/ChantierDetail'
import PageSkeleton from '../../shared/components/PageSkeleton'
import type { Chantier } from '../../shared/types/crm'

export default function ChantiersPage() {
  const { data, isLoading, isError } = useChantiers()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [view, setView] = useState<'list' | 'kanban'>('list')

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur lors du chargement des chantiers</p></div>

  if (selectedId) return <ChantierDetail chantierId={selectedId} onBack={() => setSelectedId(null)} />

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Chantiers</h1>
          <p className="text-slate-500 text-sm">Gère tes chantiers et leur rentabilité</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}><List className="w-4 h-4" /></button>
            <button onClick={() => setView('kanban')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}><LayoutGrid className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {view === 'list'
        ? <ChantiersList data={data ?? []} onSelectChantier={(c: Chantier) => setSelectedId(c.id)} />
        : <ChantierKanban data={data ?? []} onSelect={(c: Chantier) => setSelectedId(c.id)} />
      }
    </div>
  )
}
