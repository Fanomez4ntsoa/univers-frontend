export interface Prospect {
  id: number
  owner_id: number
  name: string
  email: string | null
  phone: string | null
  city: string | null
  source: string | null
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  pipeline_stage: 'prospect' | 'devis' | 'negociation' | 'signe' | 'perdu'
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Client {
  id: number
  owner_id: number
  prospect_id: number | null
  name: string
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  company_name: string | null
  siret: string | null
  total_quotes: number
  total_invoices: number
  total_revenue: string
  portal_token: string | null
  created_at: string
  updated_at: string
}

export interface QuoteItem {
  description: string
  quantity: number
  unit: string
  unit_price: number
  discount_amount: number
  subtotal: number
  tva_amount: number
  total: number
}

export interface Quote {
  id: number
  owner_id: number
  client_id: number
  quote_number: string
  title: string
  items: QuoteItem[]
  subtotal: string
  tax_amount: string
  total: string
  status: 'draft' | 'sent' | 'accepted' | 'refused' | 'expired' | 'invoiced'
  signed: boolean
  signed_by: string | null
  signature_url: string | null
  valid_until: string
  notes: string | null
  created_at: string
  updated_at: string
  client?: Pick<Client, 'id' | 'name' | 'email'>
}

export interface Invoice {
  id: number
  owner_id: number
  client_id: number
  quote_id: number | null
  invoice_number: string
  items: QuoteItem[]
  subtotal: string
  tax_amount: string
  total: string
  amount_paid: string
  amount_due: string
  status: 'draft' | 'sent' | 'pending' | 'paid' | 'overdue' | 'cancelled'
  due_date: string | null
  payment_date: string | null
  sent_at: string | null
  paid_at: string | null
  created_at: string
  updated_at: string
  client?: Pick<Client, 'id' | 'name' | 'email'>
  quote?: Quote | null
}

export interface ChantierDocument {
  id: number
  name: string
  file_url: string
  file_type: string
  created_at: string
}

export interface ChantierComment {
  id: number
  content: string
  created_at: string
}

export interface ChantierTimeEntry {
  id: number
  worker_name: string
  hours: string
  date: string
  description: string | null
}

export interface ChantierCost {
  id: number
  description: string
  amount: string
  category: string
  date: string
}

export interface Chantier {
  id: number
  owner_id: number
  client_id: number
  client_name: string
  quote_id: number | null
  quote_number: string | null
  chantier_type: 'renovation' | 'construction' | 'extension' | 'plomberie' |
                 'electricite' | 'peinture' | 'toiture' | 'carrelage' |
                 'maconnerie' | 'autre'
  address: string | null
  city: string | null
  status: 'to_plan' | 'planned' | 'started' | 'in_progress' | 'completed' | 'cancelled'
  pipeline_stage: string
  actual_start_date: string | null
  actual_end_date: string | null
  quote_amount: string
  estimated_cost: string
  total_hours: string
  actual_cost: string | null
  margin: string | null
  rentability: string | null
  rentability_level: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
  documents?: ChantierDocument[]
  comments?: ChantierComment[]
  time_entries?: ChantierTimeEntry[]
  costs?: ChantierCost[]
}

export interface CompanySettings {
  id: number
  user_id: number
  company_name: string
  siret: string
  tva_number: string | null
  address: string
  city: string
  postal_code: string
  phone: string
  email: string
  website: string | null
  logo_url: string | null
  cgv_text: string
  payment_terms: string
  bank_details: string | null
  quote_counter: number
  invoice_counter: number
}
