// AnnoncesFilters.tsx — Fidèle à Emergent barre filtres pills sticky
// + panneau slide-in depuis la GAUCHE avec catégories bâtiment

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SlidersHorizontal, Euro, MapPin, X, Layers,
  Zap, Droplets, Paintbrush, Construction, Hammer, Flame,
  Building2, Wind, TreePine, Waves, Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Category {
  id: string
  label: string
  icon: LucideIcon
  color: string
}

const CATEGORIES: Category[] = [
  { id: 'electricite', label: 'Électricité', icon: Zap, color: '#F59E0B' },
  { id: 'plomberie', label: 'Plomberie', icon: Droplets, color: '#3B82F6' },
  { id: 'peinture', label: 'Peinture & Déco', icon: Paintbrush, color: '#EC4899' },
  { id: 'maconnerie', label: 'Maçonnerie', icon: Construction, color: '#6B7280' },
  { id: 'menuiserie', label: 'Menuiserie', icon: Hammer, color: '#92400E' },
  { id: 'chauffage', label: 'Chauffage', icon: Flame, color: '#EF4444' },
  { id: 'couverture', label: 'Couverture', icon: Building2, color: '#7C3AED' },
  { id: 'climatisation', label: 'Climatisation', icon: Wind, color: '#06B6D4' },
  { id: 'jardin', label: 'Jardin & Paysage', icon: TreePine, color: '#22C55E' },
  { id: 'piscine', label: 'Piscine & Spa', icon: Waves, color: '#3B82F6' },
  { id: 'outillage', label: 'Outillage', icon: Wrench, color: '#64748B' },
  { id: 'equipements', label: 'Équipements', icon: Construction, color: '#8B5CF6' },
]

const PRICE_RANGES = [
  { id: '0-50', label: 'Moins de 50 €' },
  { id: '50-100', label: '50 € - 100 €' },
  { id: '100-250', label: '100 € - 250 €' },
  { id: '250-500', label: '250 € - 500 €' },
  { id: '500+', label: 'Plus de 500 €' },
]

interface Props {
  category: string
  onCategoryChange: (cat: string) => void
  resultCount: number
}

export default function AnnoncesFilters({ category, onCategoryChange, resultCount }: Props) {
  const [showPanel, setShowPanel] = useState(false)
  const [panelCategory, setPanelCategory] = useState(category)
  const selectedLabel = CATEGORIES.find((c) => c.id === category)?.label

  const applyFilters = () => {
    onCategoryChange(panelCategory)
    setShowPanel(false)
  }

  return (
    <>
      {/* Barre pills */}
      <div style={{ background: '#F3F4F6', borderBottom: '1px solid #E5E7EB', padding: '12px 0' }}>
        <div
          className="hide-scrollbar-ann"
          style={{
            display: 'flex',
            gap: '10px',
            padding: '12px 24px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
        <button
          onClick={() => { setPanelCategory(category); setShowPanel(true) }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: category ? '#FFF8F4' : '#FFFFFF',
            border: category ? '1.5px solid #E8650A' : '1.5px solid #E5E7EB',
            borderRadius: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '13px',
            fontWeight: category ? '600' : '500',
            color: category ? '#E8650A' : '#1a2a4a',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          <SlidersHorizontal size={14} color={category ? '#E8650A' : '#1a2a4a'} />
          {selectedLabel || 'Catégories & Filtres'}
          {category && (
            <span style={{ background: '#E8650A', color: '#FFFFFF', borderRadius: '10px', padding: '1px 6px', fontSize: '10px', fontWeight: '700' }}>1</span>
          )}
        </button>

        <button
          onClick={() => { setPanelCategory(category); setShowPanel(true) }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
            background: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: '500',
            color: '#1a2a4a', whiteSpace: 'nowrap', cursor: 'pointer',
          }}
        >
          <Euro size={14} color="#1a2a4a" />
          Prix
        </button>

        <button
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
            background: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: '500',
            color: '#1a2a4a', whiteSpace: 'nowrap', cursor: 'pointer',
          }}
        >
          <MapPin size={14} color="#1a2a4a" />
          Ville
        </button>

        <style>{`.hide-scrollbar-ann::-webkit-scrollbar { display: none; }`}</style>
        </div>
      </div>

      {/* Filtres actifs + compteur */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">{resultCount} annonces</span>
              {category && <span className="text-xs text-gray-500">avec filtres</span>}
            </div>
            {category && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-[#1E40AF]/10 text-[#1E40AF] px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                  {selectedLabel}
                  <button onClick={() => onCategoryChange('')} className="hover:bg-[#1E40AF]/20 rounded-full"><X size={12} /></button>
                </span>
                <button onClick={() => onCategoryChange('')} className="text-xs text-red-600 hover:underline font-medium">Effacer</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Panneau filtres slide-in GAUCHE */}
      <AnimatePresence>
        {showPanel && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPanel(false)} className="fixed inset-0 bg-black/40 z-50" />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[320px] max-w-[85vw] bg-white z-50 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Tous les filtres</h2>
                <button onClick={() => setShowPanel(false)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Contenu scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Catégories */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Layers size={16} className="text-[#1E40AF]" />
                    Catégorie
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setPanelCategory('')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${!panelCategory ? 'bg-[#1E40AF] text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Toutes les catégories
                    </button>
                    {CATEGORIES.map((cat) => {
                      const isActive = panelCategory === cat.id
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setPanelCategory(cat.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 ${isActive ? 'text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                          style={isActive ? { backgroundColor: cat.color } : {}}
                        >
                          <cat.icon size={16} />
                          {cat.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Prix */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Euro size={16} className="text-[#10B981]" />
                    Fourchette de prix
                  </h3>
                  <div className="space-y-1">
                    {PRICE_RANGES.map((pr) => (
                      <button key={pr.id} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-all">
                        {pr.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
                <button
                  onClick={applyFilters}
                  className="w-full h-11 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-semibold transition-colors"
                >
                  Voir les résultats ({resultCount})
                </button>
                <button
                  onClick={() => { setPanelCategory(''); onCategoryChange(''); setShowPanel(false) }}
                  className="w-full py-2 text-sm text-red-600 hover:underline font-medium"
                >
                  Réinitialiser tous les filtres
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
