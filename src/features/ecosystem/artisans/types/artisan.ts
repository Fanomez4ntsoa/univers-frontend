import type { Shop } from '../../../ecosystem/shops/types/shop'

// ArtisanShop = Shop de l'API — les cards affichent ces champs
export type ArtisanShop = Shop

export interface ArtisanFilters {
  metier: string
  city: string
  verified: boolean
}
