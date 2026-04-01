import type { Chantier } from '../../../../shared/types/crm'

export type ChantierStatus = Chantier['status']
export type ChantierType = Chantier['chantier_type']
export type RentabilityLevel = Chantier['rentability_level']

export const STATUS_CONFIG: Record<ChantierStatus, { label: string; color: string }> = {
  to_plan: { label: 'À planifier', color: 'bg-slate-100 text-slate-700' },
  planned: { label: 'Planifié', color: 'bg-blue-100 text-blue-700' },
  started: { label: 'Démarré', color: 'bg-yellow-100 text-yellow-700' },
  in_progress: { label: 'En cours', color: 'bg-purple-100 text-purple-700' },
  completed: { label: 'Terminé', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-700' },
}

export const PIPELINE_STAGES: ChantierStatus[] = ['to_plan', 'planned', 'started', 'in_progress', 'completed', 'cancelled']

export const TYPE_CONFIG: Record<ChantierType, string> = {
  renovation: 'Rénovation', construction: 'Construction', extension: 'Extension',
  plomberie: 'Plomberie', electricite: 'Électricité', peinture: 'Peinture',
  toiture: 'Toiture', carrelage: 'Carrelage', maconnerie: 'Maçonnerie', autre: 'Autre',
}

export const RENTABILITY_CONFIG: Record<RentabilityLevel, { label: string; color: string }> = {
  high: { label: 'Haute', color: 'text-[#10B981]' },
  medium: { label: 'Moyenne', color: 'text-[#F97316]' },
  low: { label: 'Faible', color: 'text-[#EF4444]' },
}

export const NO_DELETE_STATUSES: ChantierStatus[] = ['in_progress', 'completed']
