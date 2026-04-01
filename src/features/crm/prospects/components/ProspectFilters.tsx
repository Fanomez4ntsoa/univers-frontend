import { Search } from 'lucide-react'
import { Input } from '../../../../shared/ui/input'
import { STATUS_CONFIG, PIPELINE_CONFIG } from '../types/prospect'
import type { ProspectStatus, PipelineStage } from '../types/prospect'

interface ProspectFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  pipelineFilter: string
  onPipelineChange: (value: string) => void
}

export default function ProspectFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  pipelineFilter,
  onPipelineChange,
}: ProspectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un prospect..."
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
      >
        <option value="">Tous les statuts</option>
        {(Object.entries(STATUS_CONFIG) as [ProspectStatus, { label: string }][]).map(([value, { label }]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <select
        value={pipelineFilter}
        onChange={(e) => onPipelineChange(e.target.value)}
        className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
      >
        <option value="">Tous les pipelines</option>
        {(Object.entries(PIPELINE_CONFIG) as [PipelineStage, { label: string }][]).map(([value, { label }]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  )
}
