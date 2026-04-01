import { TableRow, TableCell } from '../../../../shared/ui/table'
import { STATUS_CONFIG, PIPELINE_CONFIG } from '../types/prospect'
import type { Prospect } from '../types/prospect'
import ProspectActions from './ProspectActions'

interface ProspectCardProps {
  prospect: Prospect
  onEdit: (prospect: Prospect) => void
  onConvert: (id: number) => void
  onDelete: (id: number) => void
}

export default function ProspectCard({ prospect, onEdit, onConvert, onDelete }: ProspectCardProps) {
  const status = STATUS_CONFIG[prospect.status]
  const pipeline = PIPELINE_CONFIG[prospect.pipeline_stage]

  return (
    <TableRow className="hover:bg-slate-50">
      <TableCell className="font-medium text-slate-900">{prospect.name}</TableCell>
      <TableCell className="text-slate-600">{prospect.email ?? '—'}</TableCell>
      <TableCell className="text-slate-600">{prospect.phone ?? '—'}</TableCell>
      <TableCell>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>
          {status.label}
        </span>
      </TableCell>
      <TableCell className="text-slate-600">{pipeline.label}</TableCell>
      <TableCell>
        <ProspectActions
          onEdit={() => onEdit(prospect)}
          onConvert={() => onConvert(prospect.id)}
          onDelete={() => onDelete(prospect.id)}
          isConverted={prospect.status === 'converted'}
        />
      </TableCell>
    </TableRow>
  )
}
