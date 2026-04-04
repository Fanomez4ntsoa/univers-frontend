import { useQuery } from '@tanstack/react-query'
import { ecosystemAPI } from '../../../../shared/lib/axios'
import type { Shop } from '../../shops/types/shop'

export interface MarketplaceProduct {
  id: number
  shop_id: number
  user_id: number
  name: string
  description: string | null
  price: string
  images: string[]
  category: string | null
  stock: number
  is_active: boolean
  created_at: string
  shop_name: string
  shop_slug: string
  shop_city: string | null
}

export interface MarketplaceFilters {
  search: string
  category: string
  sort: string
}

export function useProducts(filters?: Partial<MarketplaceFilters>) {
  return useQuery({
    queryKey: ['marketplace-products', filters],
    queryFn: async () => {
      // 1. Récupérer toutes les boutiques
      const { data: shops } = await ecosystemAPI.get<Shop[]>('/api/ecosystem/shops')

      // 2. Pour chaque boutique, récupérer les produits
      const allProducts: MarketplaceProduct[] = []
      await Promise.all(
        shops.map(async (shop) => {
          try {
            const { data } = await ecosystemAPI.get<{ shop: Shop; products: Array<{
              id: number; shop_id: number; user_id: number; name: string; description: string | null;
              price: string; images: string[]; category: string | null; stock: number; is_active: boolean; created_at: string;
            }> }>(`/api/ecosystem/shops/${shop.slug}`)
            for (const p of data.products) {
              allProducts.push({
                ...p,
                shop_name: shop.name,
                shop_slug: shop.slug,
                shop_city: shop.city,
              })
            }
          } catch {
            // Skip les shops qui échouent
          }
        })
      )

      return allProducts
    },
    select: (data) => {
      let result = [...data]
      if (filters?.search) {
        const q = filters.search.toLowerCase()
        result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
      }
      if (filters?.category) result = result.filter((p) => p.category === filters.category || p.shop_name === filters.category)
      return result
    },
  })
}
