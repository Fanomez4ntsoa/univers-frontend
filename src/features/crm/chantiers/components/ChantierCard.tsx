import { TableRow, TableCell } from '../../../../shared/ui/table'
import { Edit, Trash2 } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { STATUS_CONFIG, TYPE_CONFIG, NO_DELETE_STATUSES } from '../types/chantier'
import type { Chantier } from '../../../../shared/types/crm'
import RentabiliteIndicator from './RentabiliteIndicator'

interface ChantierCardProps {
  chantier: Chantier
  onSelect: (c: Chantier) => void
  onEdit: (c: Chantier) => void
  onDelete: (id: number) => void
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

export default function ChantierCard({ chantier, onSelect, onEdit, onDelete }: ChantierCardProps) {
  const status = STATUS_CONFIG[chantier.status]
  const canDelete = !NO_DELETE_STATUSES.includes(chantier.status)

  return (
    <TableRow className="hover:bg-slate-50 cursor-pointer" onClick={() => onSelect(chantier)}>
      <TableCell className="font-medium text-slate-900">{chantier.client_name}</TableCell>
      <TableCell className="text-slate-600">{TYPE_CONFIG[chantier.chantier_type]}</TableCell>
      <TableCell className="text-slate-600">{chantier.city ?? '—'}</TableCell>
      <TableCell>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>{status.label}</span>
      </TableCell>
      <TableCell>
        <RentabiliteIndicator level={chantier.rentability_level} margin={chantier.margin} />
      </TableCell>
      <TableCell className="text-slate-500 text-sm">
        {fmtDate(chantier.actual_start_date)} → {fmtDate(chantier.actual_end_date)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon-sm" onClick={() => onEdit(chantier)} title="Modifier"><Edit className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={() => onDelete(chantier.id)} disabled={!canDelete} title="Supprimer" className="text-red-500 disabled:opacity-30"><Trash2 className="w-4 h-4" /></Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
