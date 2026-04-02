import type { QuoteItem } from '../../../shared/types/crm'

export interface PortalClient {
  name: string
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  company_name: string | null
}

export interface PortalDashboard {
  client: PortalClient
  quotes: PortalQuoteSummary[]
  invoices: PortalInvoiceSummary[]
}

export interface PortalQuoteSummary {
  id: number
  quote_number: string
  title: string
  total: string
  status: string
  valid_until: string
  signed: boolean
}

export interface PortalInvoiceSummary {
  id: number
  invoice_number: string
  total: string
  amount_paid: string
  amount_due: string
  status: string
  due_date: string | null
}

export interface PortalQuote {
  id: number
  quote_number: string
  title: string
  items: QuoteItem[]
  subtotal: string
  tax_amount: string
  total: string
  status: string
  signed: boolean
  signed_by: string | null
  signature_url: string | null
  valid_until: string
  notes: string | null
  created_at: string
  cgv_text: string | null
  company_name: string | null
}

export interface PortalInvoice {
  id: number
  invoice_number: string
  items: QuoteItem[]
  subtotal: string
  tax_amount: string
  total: string
  amount_paid: string
  amount_due: string
  status: string
  due_date: string | null
  payment_date: string | null
  created_at: string
}
