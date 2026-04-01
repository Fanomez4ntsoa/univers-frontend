import { TableRow, TableCell } from '../../../../shared/ui/table'
import { Building, Edit, Trash2 } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import type { Client } from '../../../../shared/types/crm'

interface ClientCardProps {
  client: Client
  onSelect: (client: Client) => void
  onEdit: (client: Client) => void
  onDelete: (id: number) => void
}

function formatCurrency(value: string | number) {
  const num = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(num || 0)
}

export default function ClientCard({ client, onSelect, onEdit, onDelete }: ClientCardProps) {
  return (
    <TableRow className="hover:bg-slate-50 cursor-pointer" onClick={() => onSelect(client)}>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1E40AF]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Building className="w-4 h-4 text-[#1E40AF]" />
          </div>
          <div>
            <span className="font-medium text-slate-900">{client.name}</span>
            {client.company_name && (
              <p className="text-xs text-slate-500">{client.company_name}</p>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="text-slate-600">{client.email ?? '—'}</TableCell>
      <TableCell className="text-slate-600">{client.phone ?? '—'}</TableCell>
      <TableCell className="text-slate-600">{client.city ?? '—'}</TableCell>
      <TableCell>
        <span className={`text-sm font-medium ${client.total_quotes > 0 ? 'text-[#1E40AF]' : 'text-slate-400'}`}>
          {client.total_quotes}
        </span>
      </TableCell>
      <TableCell>
        <span className={`text-sm font-medium ${client.total_invoices > 0 ? 'text-[#F97316]' : 'text-slate-400'}`}>
          {client.total_invoices}
        </span>
      </TableCell>
      <TableCell>
        <span className={`text-sm font-semibold ${parseFloat(client.total_revenue) > 0 ? 'text-[#10B981]' : 'text-slate-400'}`}>
          {formatCurrency(client.total_revenue)}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon-sm" onClick={() => onEdit(client)} title="Modifier">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => onDelete(client.id)} title="Supprimer" className="text-red-500 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
