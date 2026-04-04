export interface ShopUser {
  id: number
  display_name: string
  avatar_url: string | null
  metier: string | null
  phone?: string | null
}

export interface Shop {
  id: number
  user_id: number
  slug: string
  name: string
  description: string | null
  category: string | null
  logo_url: string | null
  cover_url: string | null
  city: string | null
  address: string | null
  phone: string | null
  email: string | null
  is_active: boolean
  verified_at: string | null
  products_count: number
  created_at: string
  updated_at?: string
  deleted_at?: string | null
  user?: ShopUser
}

export interface ShopProduct {
  id: number
  shop_id: number
  name: string
  description: string | null
  price: string
  image_url: string | null
  stock: number
  is_active: boolean
  created_at: string
}

export interface ShopDetailResponse {
  shop: Shop
  products: ShopProduct[]
}

export type MyShop = Shop
