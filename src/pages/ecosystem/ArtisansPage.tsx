// ArtisansPage.tsx — Orchestration pure (max 50 lignes)
// Fidèle à Emergent ArtisansPage.jsx

import { useState } from 'react'
import { Users } from 'lucide-react'
import { useArtisans } from '../../features/ecosystem/artisans/hooks/useArtisans'
import ArtisanShopCard from '../../features/ecosystem/artisans/components/ArtisanShopCard'
import ArtisanFiltersBar from '../../features/ecosystem/artisans/components/ArtisanFilters'
import ConversionBanner from '../../features/ecosystem/artisans/components/ConversionBanner'
import BetaBanner from '../../features/ecosystem/artisans/components/BetaBanner'
import TrustSection from '../../features/ecosystem/artisans/components/TrustSection'
import ArtisansCTASection from '../../features/ecosystem/artisans/components/ArtisansCTASection'
import type { ArtisanFilters } from '../../features/ecosystem/artisans/types/artisan'

export default function ArtisansPage() {
  const [filters, setFilters] = useState<ArtisanFilters>({ metier: '', city: '', verified: false })
  const { data: shops = [], isLoading } = useArtisans(filters)

  return (
    <div className="min-h-screen bg-[#F8FAFC]" data-testid="artisans-page">
      <ArtisanFiltersBar filters={filters} onFiltersChange={setFilters} />

      <ConversionBanner />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <BetaBanner />
        <div className="flex items-center justify-between mb-6 gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
              {filters.metier ? `Artisans ${filters.metier}` : 'Tous les artisans'}
              {filters.city && ` à ${filters.city}`}
            </h2>
            <span className="text-gray-500 text-sm hidden md:flex items-center gap-1">
              <span className="font-semibold text-gray-900">{shops.length}</span> professionnels trouvés
            </span>
          </div>
          <select className="h-10 px-4 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
            <option>Pertinence</option><option>Meilleures notes</option><option>Plus d'avis</option><option>Proximité</option>
          </select>
        </div>
        <p className="text-gray-500 text-sm mb-4 md:hidden"><span className="font-semibold text-gray-900">{shops.length}</span> professionnels trouvés</p>

        {isLoading ? (
          <div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin" /></div>
        ) : shops.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center"><Users size={40} className="text-gray-400" /></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun artisan trouvé</h3>
            <p className="text-gray-500 mb-6">Essaie de modifier tes critères de recherche</p>
            <button onClick={() => setFilters({ metier: '', city: '', verified: false })} className="px-6 py-3 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white rounded-xl font-medium transition-colors">Voir tous les artisans</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop, index) => <ArtisanShopCard key={shop.id} shop={shop} index={index} />)}
          </div>
        )}
      </main>

      <TrustSection />
      <ArtisansCTASection />
    </div>
  )
}
