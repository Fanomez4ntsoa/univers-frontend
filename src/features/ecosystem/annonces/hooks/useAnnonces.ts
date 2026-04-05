import { useQuery } from '@tanstack/react-query'
import { ecosystemAPI } from '../../../../shared/lib/axios'

export interface Annonce {
  id: number
  user_id: number
  title: string
  description: string | null
  price: string
  price_type: string | null
  category: string | null
  condition: string | null
  city: string | null
  images: string[]
  status: string
  views_count: number
  created_at: string
  user?: {
    id: number
    username: string
    display_name: string
    avatar_url: string | null
    city: string | null
  }
}

export interface AnnoncesFilters {
  category: string
  priceRange: string
  city: string
}

export function useAnnonces(filters?: Partial<AnnoncesFilters>) {
  return useQuery({
    queryKey: ['annonces', filters],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get<Annonce[]>('/api/ecosystem/listings')
      return data
    },
    select: (data) => {
      let result = [...data]
      if (filters?.category) result = result.filter((a) => a.category === filters.category)
      if (filters?.city) result = result.filter((a) => a.city === filters.city)
      return result
    },
  })
}
