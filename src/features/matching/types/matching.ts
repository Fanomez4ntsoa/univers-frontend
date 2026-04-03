export interface ProjectRequest {
  id: number
  user_id: number
  title: string
  description: string
  category: string
  city: string | null
  budget_min: string | null
  budget_max: string | null
  urgency: Urgency
  status: MatchingStatus
  quotes_count: number
  created_at: string
  updated_at: string
}

export interface ProjectQuote {
  id: number
  request_id: number
  artisan_id: number
  price: string
  estimated_days: number | null
  message: string
  status: 'pending' | 'accepted' | 'refused'
  artisan: { id: number; display_name: string; username: string; avatar_url: string | null; metier: string | null }
  created_at: string
}

export type MatchingStatus = 'open' | 'matched' | 'closed' | 'cancelled'
export type Urgency = 'normal' | 'urgent' | 'tres_urgent'

export const URGENCY_CONFIG: Record<Urgency, { label: string; color: string }> = {
  normal: { label: 'Normal', color: 'bg-slate-100 text-slate-600' },
  urgent: { label: 'Urgent', color: 'bg-orange-100 text-[#F97316]' },
  tres_urgent: { label: 'Très urgent', color: 'bg-red-100 text-red-700' },
}

export const STATUS_CONFIG: Record<MatchingStatus, { label: string; color: string }> = {
  open: { label: 'Ouverte', color: 'bg-blue-100 text-blue-700' },
  matched: { label: 'Trouvé', color: 'bg-green-100 text-green-700' },
  closed: { label: 'Fermée', color: 'bg-slate-100 text-slate-500' },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700' },
}
