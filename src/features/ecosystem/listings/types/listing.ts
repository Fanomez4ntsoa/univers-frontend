export interface Listing {
  id: number
  user_id: number
  title: string
  description: string | null
  price: string
  price_type: PriceType
  condition: Condition
  category: string | null
  city: string | null
  postal_code: string | null
  image_urls: string[]
  views_count: number
  status: ListingStatus
  user?: { id: number; display_name: string; username: string; avatar_url: string | null }
  created_at: string
  updated_at: string
}

export type ListingStatus = 'active' | 'sold' | 'expired' | 'draft'
export type PriceType = 'fixed' | 'negotiable' | 'free'
export type Condition = 'new' | 'used' | 'refurbished'

export const PRICE_TYPE_CONFIG: Record<PriceType, { label: string; color: string }> = {
  fixed: { label: 'Prix fixe', color: 'bg-blue-100 text-blue-700' },
  negotiable: { label: 'Négociable', color: 'bg-orange-100 text-[#F97316]' },
  free: { label: 'Gratuit', color: 'bg-green-100 text-[#10B981]' },
}

export const CONDITION_CONFIG: Record<Condition, { label: string; color: string }> = {
  new: { label: 'Neuf', color: 'bg-green-100 text-[#10B981]' },
  used: { label: 'Occasion', color: 'bg-slate-100 text-slate-600' },
  refurbished: { label: 'Reconditionné', color: 'bg-blue-100 text-blue-700' },
}

export const STATUS_CONFIG: Record<ListingStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-green-100 text-green-700' },
  sold: { label: 'Vendu', color: 'bg-purple-100 text-purple-700' },
  expired: { label: 'Expirée', color: 'bg-slate-100 text-slate-500' },
  draft: { label: 'Brouillon', color: 'bg-slate-100 text-slate-600' },
}
