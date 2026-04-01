import { TableRow, TableCell } from '../../../../shared/ui/table'
import { STATUS_CONFIG, getPaymentColor } from '../types/invoice'
import type { Invoice } from '../../../../shared/types/crm'
import InvoiceActions from './InvoiceActions'

interface InvoiceCardProps {
  invoice: Invoice
  onSelect: (inv: Invoice) => void
  onEdit: (inv: Invoice) => void
  onDelete: (id: number) => void
  onSend: (id: number) => void
  onMarkPaid: (inv: Invoice) => void
  onCancel: (id: number) => void
}

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0)
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function InvoiceCard({ invoice, onSelect, onEdit, onDelete, onSend, onMarkPaid, onCancel }: InvoiceCardProps) {
  const status = STATUS_CONFIG[invoice.status]
  const payColor = getPaymentColor(invoice.amount_paid, invoice.total)

  return (
    <TableRow className="hover:bg-slate-50 cursor-pointer" onClick={() => onSelect(invoice)}>
      <TableCell className="font-medium text-slate-900">{invoice.invoice_number}</TableCell>
      <TableCell className="text-slate-600">{invoice.client?.name ?? '—'}</TableCell>
      <TableCell className="font-semibold text-slate-900">{fmt(invoice.total)}</TableCell>
      <TableCell className={`font-medium ${payColor}`}>{fmt(invoice.amount_paid)}</TableCell>
      <TableCell className={`font-medium ${parseFloat(invoice.amount_due) > 0 ? 'text-red-500' : 'text-slate-400'}`}>{fmt(invoice.amount_due)}</TableCell>
      <TableCell>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>{status.label}</span>
      </TableCell>
      <TableCell className="text-slate-500 text-sm">{fmtDate(invoice.due_date)}</TableCell>
      <TableCell>
        <InvoiceActions
          status={invoice.status}
          onEdit={() => onEdit(invoice)}
          onDelete={() => onDelete(invoice.id)}
          onSend={() => onSend(invoice.id)}
          onMarkPaid={() => onMarkPaid(invoice)}
          onCancel={() => onCancel(invoice.id)}
        />
      </TableCell>
    </TableRow>
  )
}
