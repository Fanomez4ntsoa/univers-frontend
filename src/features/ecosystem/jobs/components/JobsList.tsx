import { useState } from 'react'
import { Search, Plus, Briefcase } from 'lucide-react'
import { Input } from '../../../../shared/ui/input'
import { Button } from '../../../../shared/ui/button'
import { requireAuth } from '../../../../shared/lib/requireAuth'
import type { Job, ContractType } from '../types/job'
import { CONTRACT_TYPE_CONFIG } from '../types/job'
import JobCard from './JobCard'
import JobForm from './JobForm'

interface JobsListProps { jobs: Job[] }

export default function JobsList({ jobs }: JobsListProps) {
  const [search, setSearch] = useState('')
  const [contractFilter, setContractFilter] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(10)

  const filtered = (jobs ?? []).filter((j) => {
    const q = search.toLowerCase()
    const matchesSearch = j.title.toLowerCase().includes(q) || j.company_name.toLowerCase().includes(q) || j.city?.toLowerCase().includes(q)
    const matchesContract = !contractFilter || j.contract_type === contractFilter
    return matchesSearch && matchesContract
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une offre..." className="pl-10 h-11 rounded-xl" />
          </div>
          <select value={contractFilter} onChange={(e) => setContractFilter(e.target.value)} className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm">
            <option value="">Tous les contrats</option>
            {(Object.entries(CONTRACT_TYPE_CONFIG) as [ContractType, { label: string }][]).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
          </select>
        </div>
        <Button onClick={() => requireAuth(() => setFormOpen(true))} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
          <Plus className="w-5 h-5 mr-2" /> Publier une offre
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Aucune offre trouvée</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">{filtered.slice(0, visibleCount).map((j) => <JobCard key={j.id} job={j} />)}</div>
          {visibleCount < filtered.length && (
            <div className="text-center">
              <button onClick={() => setVisibleCount((v) => v + 10)} className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Charger plus</button>
            </div>
          )}
        </>
      )}

      <JobForm open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  )
}
