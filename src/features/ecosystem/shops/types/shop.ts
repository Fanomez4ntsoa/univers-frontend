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
  is_verified: boolean
  products_count: number
  created_at: string
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

export type MyShop = Shop
