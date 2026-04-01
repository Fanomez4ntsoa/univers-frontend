import { TableRow, TableCell } from '../../../../shared/ui/table'
import { STATUS_CONFIG } from '../types/quote'
import type { Quote } from '../../../../shared/types/crm'
import QuoteActions from './QuoteActions'

interface QuoteCardProps {
  quote: Quote
  onSelect: (q: Quote) => void
  onEdit: (q: Quote) => void
  onDelete: (id: number) => void
  onSend: (id: number) => void
  onSign: (q: Quote) => void
  onDuplicate: (id: number) => void
  onConvertInvoice: (id: number) => void
}

function formatCurrency(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function QuoteCard({
  quote, onSelect, onEdit, onDelete, onSend, onSign, onDuplicate, onConvertInvoice,
}: QuoteCardProps) {
  const status = STATUS_CONFIG[quote.status]

  return (
    <TableRow className="hover:bg-slate-50 cursor-pointer" onClick={() => onSelect(quote)}>
      <TableCell className="font-medium text-slate-900">{quote.quote_number}</TableCell>
      <TableCell className="text-slate-600">{quote.client?.name ?? '—'}</TableCell>
      <TableCell className="text-slate-600">{quote.title}</TableCell>
      <TableCell className="font-semibold text-slate-900">{formatCurrency(quote.total)}</TableCell>
      <TableCell>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>{status.label}</span>
      </TableCell>
      <TableCell className="text-slate-500 text-sm">{formatDate(quote.valid_until)}</TableCell>
      <TableCell>
        <QuoteActions
          status={quote.status}
          onEdit={() => onEdit(quote)}
          onDelete={() => onDelete(quote.id)}
          onSend={() => onSend(quote.id)}
          onSign={() => onSign(quote)}
          onDuplicate={() => onDuplicate(quote.id)}
          onConvertInvoice={() => onConvertInvoice(quote.id)}
        />
      </TableCell>
    </TableRow>
  )
}
