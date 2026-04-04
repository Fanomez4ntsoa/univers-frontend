import { useQuery } from '@tanstack/react-query'
import { ecosystemAPI } from '../../../../shared/lib/axios'
import type { ArtisanShop } from '../types/artisan'

// Données mock — fallback si l'API ne répond pas
const MOCK_ARTISANS: ArtisanShop[] = [
  { id: 1, user_id: 1, slug: 'plomberie-martin-lyon', name: 'Plomberie Martin & Fils', category: 'Plombier', description: 'Entreprise familiale depuis 1985. Spécialistes en plomberie générale, chauffage et sanitaires.', city: 'Lyon', address: null, phone: '04 78 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 2, user_id: 2, slug: 'elec-pro-marseille', name: 'Élec Pro Méditerranée', category: 'Électricien', description: 'Électriciens certifiés Qualifelec. Mise aux normes, domotique, bornes de recharge.', city: 'Marseille', address: null, phone: '04 91 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 3, user_id: 3, slug: 'maconnerie-dupont-toulouse', name: 'Maçonnerie Dupont', category: 'Maçon', description: 'Maçonnerie traditionnelle et moderne. Construction, rénovation, extension.', city: 'Toulouse', address: null, phone: '05 61 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 4, user_id: 4, slug: 'carrelage-concept-nice', name: 'Carrelage Concept Côte d\'Azur', category: 'Carreleur', description: 'Pose de carrelage haut de gamme. Spécialistes grands formats, mosaïque et pierre naturelle.', city: 'Nice', address: null, phone: '04 93 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 5, user_id: 5, slug: 'peinture-artdeco-bordeaux', name: 'Art\'Déco Peinture', category: 'Peintre', description: 'Peinture décorative et technique. Ravalement, papier peint, effets décoratifs.', city: 'Bordeaux', address: null, phone: '05 56 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 6, user_id: 6, slug: 'menuiserie-bois-nantes', name: 'L\'Atelier du Bois', category: 'Menuisier', description: 'Menuiserie sur mesure. Fabrication artisanale de meubles, cuisines, dressings.', city: 'Nantes', address: null, phone: '02 40 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 7, user_id: 7, slug: 'toiture-expertise-lille', name: 'Toiture Expertise Nord', category: 'Couvreur', description: 'Couverture, zinguerie et isolation de toiture. Urgence fuite 24h/24.', city: 'Lille', address: null, phone: '03 20 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 8, user_id: 8, slug: 'chauffage-confort-strasbourg', name: 'Chauffage Confort Plus', category: 'Chauffagiste', description: 'Installation et entretien de systèmes de chauffage. PAC, chaudières, plancher chauffant.', city: 'Strasbourg', address: null, phone: '03 88 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 9, user_id: 9, slug: 'piscine-azur-montpellier', name: 'Piscines Azur Méditerranée', category: 'Pisciniste', description: 'Construction et rénovation de piscines. Liner, béton, traitement automatique.', city: 'Montpellier', address: null, phone: '04 67 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 10, user_id: 10, slug: 'jardin-creation-rennes', name: 'Jardins & Créations', category: 'Paysagiste', description: 'Conception et création de jardins. Terrasses, clôtures, arrosage automatique.', city: 'Rennes', address: null, phone: '02 99 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 11, user_id: 11, slug: 'clim-pro-aix', name: 'Clim\'Pro Provence', category: 'Climaticien', description: 'Installation et maintenance climatisation. Réversible, gainable, multi-split.', city: 'Aix-en-Provence', address: null, phone: '04 42 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
  { id: 12, user_id: 12, slug: 'facade-renovation-dijon', name: 'Façades & Rénovation', category: 'Façadier', description: 'Ravalement de façades, ITE, crépi. Traitement des fissures et imperméabilisation.', city: 'Dijon', address: null, phone: '03 80 XX XX XX', email: null, logo_url: null, cover_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800', is_active: true, verified_at: '2025-01-01', products_count: 0, created_at: '2025-01-01' },
]

export function useArtisans(filters?: { metier?: string; city?: string; verified?: boolean }) {
  return useQuery({
    queryKey: ['artisans', filters],
    queryFn: async () => {
      try {
        const { data } = await ecosystemAPI.get<ArtisanShop[]>('/api/ecosystem/shops')
        return data
      } catch {
        // Fallback mock si API indisponible
        return MOCK_ARTISANS
      }
    },
    select: (data) => {
      let result = [...data]
      if (filters?.metier) result = result.filter((a) => a.category === filters.metier)
      if (filters?.city) result = result.filter((a) => a.city === filters.city)
      if (filters?.verified) result = result.filter((a) => a.verified_at !== null)
      return result
    },
  })
}
