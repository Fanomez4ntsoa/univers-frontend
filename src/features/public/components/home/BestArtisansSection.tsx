import { Award } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ArtisanCard from './ArtisanCard'
import type { Artisan } from './ArtisanCard'

const MOCK_ARTISANS: Artisan[] = [
  {
    id: 'art-1',
    shop_name: 'Plomberie Martin',
    metier: 'Plombier',
    city: 'Lyon',
    rating_average: 4.9,
    is_verified: true,

    cover_image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
    logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
  },
  {
    id: 'art-2',
    shop_name: 'Élec Pro',
    metier: 'Électricien',
    city: 'Paris',
    rating_average: 4.8,
    is_verified: true,

    cover_image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
    logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  },
  {
    id: 'art-3',
    shop_name: 'Maçonnerie Dupont',
    metier: 'Maçon',
    city: 'Marseille',
    rating_average: 4.7,
    is_verified: true,

    cover_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    id: 'art-4',
    shop_name: 'Carrelage Concept',
    metier: 'Carreleur',
    city: 'Nice',
    rating_average: 5.0,
    is_verified: true,

    cover_image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
]

export default function BestArtisansSection() {
  return (
    <section className="py-8 sm:py-12 px-4 bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Award}
          title="Meilleurs Artisans de la Semaine"
          subtitle="Les professionnels les mieux notes par nos clients"
          link="/artisans"
          color="#10B981"
        />

        {/* Scroll horizontal sur une ligne */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {MOCK_ARTISANS.map((shop, index) => (
              <ArtisanCard key={shop.id} shop={shop} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
