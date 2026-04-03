import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '../../../shared/ui/input'
import type { ProjectRequest } from '../types/matching'
import AvailableRequestCard from './AvailableRequestCard'
import SubmitQuoteModal from './SubmitQuoteModal'

interface AvailableRequestsListProps { requests: ProjectRequest[] }

export default function AvailableRequestsList({ requests }: AvailableRequestsListProps) {
  const [search, setSearch] = useState('')
  const [quoteTarget, setQuoteTarget] = useState<ProjectRequest | null>(null)

  const filtered = (requests ?? []).filter((r) => {
    const q = search.toLowerCase()
    return r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.city?.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une demande..." className="pl-10 h-11 rounded-xl" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500">Aucune demande disponible</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => <AvailableRequestCard key={r.id} request={r} onSubmitQuote={setQuoteTarget} />)}
        </div>
      )}

      {quoteTarget && <SubmitQuoteModal open={!!quoteTarget} onClose={() => setQuoteTarget(null)} request={quoteTarget} />}
    </div>
  )
}
