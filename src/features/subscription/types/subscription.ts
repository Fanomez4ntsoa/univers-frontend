export interface Subscription {
  id: number
  user_id: number
  plan: PlanSlug
  status: SubscriptionStatus
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  stripe_subscription_id: string | null
  created_at: string
}

export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'cancelled' | 'incomplete'
export type PlanSlug = 'pro_monthly' | 'pro_yearly'

export interface CheckoutSession {
  checkout_url: string
}

export interface PortalSession {
  portal_url: string
}

export const PLAN_CONFIG: Record<PlanSlug, { name: string; price: number; period: string; badge?: string }> = {
  pro_monthly: { name: 'Pro Mensuel', price: 49, period: '/mois' },
  pro_yearly: { name: 'Pro Annuel', price: 468, period: '/an', badge: 'Économise 20%' },
}

export const STATUS_LABELS: Record<SubscriptionStatus, { label: string; color: string }> = {
  active: { label: 'Actif', color: 'bg-green-100 text-green-700' },
  trialing: { label: 'Essai', color: 'bg-blue-100 text-blue-700' },
  past_due: { label: 'Impayé', color: 'bg-red-100 text-red-700' },
  cancelled: { label: 'Annulé', color: 'bg-slate-100 text-slate-500' },
  incomplete: { label: 'Incomplet', color: 'bg-yellow-100 text-yellow-700' },
}
