import type { Invoice } from '../../../../shared/types/crm'

export type InvoiceStatus = Invoice['status']

export const STATUS_CONFIG: Record<InvoiceStatus, { label: string; color: string }> = {
  draft: { label: 'Brouillon', color: 'bg-slate-100 text-slate-700' },
  sent: { label: 'Envoyée', color: 'bg-blue-100 text-blue-700' },
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700' },
  paid: { label: 'Payée', color: 'bg-green-100 text-green-700' },
  overdue: { label: 'En retard', color: 'bg-red-100 text-red-700' },
  cancelled: { label: 'Annulée', color: 'bg-slate-100 text-slate-500' },
}

export const READONLY_STATUSES: InvoiceStatus[] = ['paid', 'cancelled']

export function getPaymentColor(amountPaid: string, total: string): string {
  const paid = parseFloat(amountPaid) || 0
  const tot = parseFloat(total) || 0
  if (paid <= 0) return 'text-slate-400'
  if (paid >= tot) return 'text-[#10B981]'
  return 'text-[#F97316]'
}
