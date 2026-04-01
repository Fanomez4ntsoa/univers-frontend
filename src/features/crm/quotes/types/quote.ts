import type { Quote } from '../../../../shared/types/crm'

export type QuoteStatus = Quote['status']

export const STATUS_CONFIG: Record<QuoteStatus, { label: string; color: string }> = {
  draft: { label: 'Brouillon', color: 'bg-slate-100 text-slate-700' },
  sent: { label: 'Envoyé', color: 'bg-blue-100 text-blue-700' },
  accepted: { label: 'Accepté', color: 'bg-green-100 text-green-700' },
  refused: { label: 'Refusé', color: 'bg-red-100 text-red-700' },
  expired: { label: 'Expiré', color: 'bg-orange-100 text-orange-700' },
  invoiced: { label: 'Facturé', color: 'bg-purple-100 text-purple-700' },
}

export const IMMUTABLE_STATUSES: QuoteStatus[] = ['accepted', 'invoiced']

export interface QuoteItemForm {
  description: string
  quantity: number
  unit: string
  unit_price: number
  discount_amount: number
}

export interface QuoteFormData {
  client_id: number | ''
  title: string
  items: QuoteItemForm[]
  notes: string
  valid_until: string
}
