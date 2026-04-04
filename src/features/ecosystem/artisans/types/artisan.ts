export interface Artisan {
  id: string
  slug?: string
  shop_name: string
  metier: string
  description?: string
  city: string
  postal_code?: string
  phone?: string
  is_verified: boolean
  rating_average: number
  reviews_count: number
  cover_image?: string
  logo?: string
  services?: string[]
}

export interface ArtisanFilters {
  metier: string
  city: string
  verified: boolean
}
