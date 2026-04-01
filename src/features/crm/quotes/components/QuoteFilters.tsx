import { Search } from 'lucide-react'
import { Input } from '../../../../shared/ui/input'
import { STATUS_CONFIG } from '../types/quote'
import type { QuoteStatus } from '../types/quote'

interface QuoteFiltersProps {
  search: string
  onSearchChange: (v: string) => void
  statusFilter: string
  onStatusChange: (v: string) => void
}

export default function QuoteFilters({ search, onSearchChange, statusFilter, onStatusChange }: QuoteFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Rechercher un devis..." className="pl-10 h-11 rounded-xl" />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
      >
        <option value="">Tous les statuts</option>
        {(Object.entries(STATUS_CONFIG) as [QuoteStatus, { label: string }][]).map(([v, { label }]) => (
          <option key={v} value={v}>{label}</option>
        ))}
      </select>
    </div>
  )
}
