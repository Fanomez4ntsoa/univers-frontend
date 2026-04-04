// MarketplacePage.tsx — Orchestration pure (max 50 lignes)
// Fidèle à Emergent MarketplaceProduitsPage.jsx

import { useState } from 'react'
import { Package } from 'lucide-react'
import { useProducts } from '../../features/ecosystem/marketplace/hooks/useMarketplace'
import MarketplaceProductCard from '../../features/ecosystem/marketplace/components/MarketplaceProductCard'
import MarketplaceFilters from '../../features/ecosystem/marketplace/components/MarketplaceFilters'
import MarketplaceFilterSidebar from '../../features/ecosystem/marketplace/components/MarketplaceFilterSidebar'
import ConversionBannerMarketplace from '../../features/ecosystem/marketplace/components/ConversionBannerMarketplace'
import MarketplaceTrust from '../../features/ecosystem/marketplace/components/MarketplaceTrust'
import BetaBanner from '../../shared/components/BetaBanner'

export default function MarketplacePage() {
  const [category, setCategory] = useState('')
  const { data: products = [], isLoading } = useProducts(category ? { category } : undefined)

  return (
    <div className="min-h-screen bg-[#F8FAFC]" data-testid="marketplace-produits-page">
      <MarketplaceFilters activeFiltersCount={category ? 1 : 0} onOpenFilters={() => {}} />
      <ConversionBannerMarketplace />

      {/* Results Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="font-bold text-lg text-gray-900">{products.length}</span>
            <span className="text-gray-600 ml-1">résultat{products.length !== 1 ? 's' : ''}</span>
          </div>
          <select className="text-sm border border-gray-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
            <option>Pertinence</option><option>Prix croissant</option><option>Prix décroissant</option><option>Meilleures notes</option><option>Plus récents</option>
          </select>
        </div>
      </div>

      {/* Beta + Content */}
      <div className="max-w-7xl mx-auto px-4 pt-4"><BetaBanner /></div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <MarketplaceFilterSidebar selectedCategory={category} onCategoryChange={setCategory} productCount={products.length} />
          <main className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin" /></div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Package size={56} className="mx-auto text-gray-300 mb-4" />
                <h3 className="font-bold text-xl text-gray-900 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-500 mb-6">Essaie de modifier tes critères de recherche</p>
                <button onClick={() => setCategory('')} className="px-6 py-3 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white rounded-xl font-medium transition-colors">Voir tous les produits</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {products.map((product, index) => <MarketplaceProductCard key={product.id} product={product} index={index} />)}
              </div>
            )}
          </main>
        </div>
      </div>

      <MarketplaceTrust />
    </div>
  )
}
