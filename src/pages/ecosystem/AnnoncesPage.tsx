// AnnoncesPage.tsx — Orchestration pure (max 50 lignes)
// Fidèle à Emergent PetitesAnnoncesPage.jsx

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Plus } from 'lucide-react'
import { useAnnonces } from '../../features/ecosystem/annonces/hooks/useAnnonces'
import AnnonceCard from '../../features/ecosystem/annonces/components/AnnonceCard'
import AnnoncesFilters from '../../features/ecosystem/annonces/components/AnnoncesFilters'
import ConversionBannerAnnonces from '../../features/ecosystem/annonces/components/ConversionBannerAnnonces'
import BetaBanner from '../../shared/components/BetaBanner'

export default function AnnoncesPage() {
  const [category, setCategory] = useState('')
  const { data: annonces = [], isLoading } = useAnnonces(category ? { category } : undefined)

  return (
    <div className="min-h-screen bg-[#F8FAFC]" data-testid="petites-annonces-page">
      <AnnoncesFilters category={category} onCategoryChange={setCategory} resultCount={annonces.length} />
      <ConversionBannerAnnonces />

      <div className="max-w-7xl mx-auto px-4 pt-4"><BetaBanner /></div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin" /></div>
        ) : annonces.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Package size={56} className="mx-auto text-gray-300 mb-4" />
            <h3 className="font-bold text-xl text-gray-900 mb-2">Aucune annonce trouvée</h3>
            <p className="text-gray-500 mb-6">Sois le premier à déposer une annonce !</p>
            <Link to="/listings" className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-semibold transition-colors">
              <Plus size={18} />
              Déposer une annonce
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {annonces.map((annonce, index) => <AnnonceCard key={annonce.id} annonce={annonce} index={index} />)}
          </div>
        )}
      </main>
    </div>
  )
}
