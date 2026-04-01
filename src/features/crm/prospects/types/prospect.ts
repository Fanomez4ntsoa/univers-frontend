export interface Prospect {
  id: number
  owner_id: number
  name: string
  email: string | null
  phone: string | null
  city: string | null
  source: string | null
  status: ProspectStatus
  pipeline_stage: PipelineStage
  notes: string | null
  created_at: string
  updated_at: string
}

export type ProspectStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
export type PipelineStage = 'prospect' | 'devis' | 'negociation' | 'signe' | 'perdu'

export const STATUS_CONFIG: Record<ProspectStatus, { label: string; color: string }> = {
  new: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: 'Contacté', color: 'bg-yellow-100 text-yellow-700' },
  qualified: { label: 'Qualifié', color: 'bg-purple-100 text-purple-700' },
  converted: { label: 'Converti', color: 'bg-green-100 text-green-700' },
  lost: { label: 'Perdu', color: 'bg-red-100 text-red-700' },
}

export const PIPELINE_CONFIG: Record<PipelineStage, { label: string }> = {
  prospect: { label: 'Prospect' },
  devis: { label: 'Devis' },
  negociation: { label: 'Négociation' },
  signe: { label: 'Signé' },
  perdu: { label: 'Perdu' },
}
