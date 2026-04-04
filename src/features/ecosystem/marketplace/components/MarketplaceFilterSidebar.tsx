// MarketplaceFilterSidebar.tsx — Fidèle à Emergent FilterSidebar
// Sidebar 260px desktop avec catégories + filtres

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, ChevronDown, Layers, Package } from 'lucide-react'

const CATEGORIES = [
  'Plombier', 'Électricien', 'Maçon', 'Carreleur', 'Peintre', 'Menuisier',
  'Couvreur', 'Chauffagiste', 'Pisciniste', 'Paysagiste', 'Climaticien', 'Façadier',
]

interface Props {
  selectedCategory: string
  onCategoryChange: (cat: string) => void
  productCount: number
}

export default function MarketplaceFilterSidebar({ selectedCategory, onCategoryChange, productCount }: Props) {
  const [expandedSections, setExpandedSections] = useState({ rayons: true, price: true })
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section as keyof typeof prev] }))
  }

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <span className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-2">
            <Filter size={18} className="text-[#1E40AF]" />
            Filtres
          </span>
          {selectedCategory && (
            <button onClick={() => onCategoryChange('')} className="text-xs text-[#F97316] hover:underline font-medium">
              Réinitialiser
            </button>
          )}
        </div>

        {/* Catégories */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection('rayons')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
          >
            <span className="font-semibold text-gray-900">Catégories</span>
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform ${expandedSections.rayons ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {expandedSections.rayons && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3 space-y-1 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => onCategoryChange('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      !selectedCategory ? 'bg-[#1E40AF] text-white' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Layers size={16} />
                    Toutes les catégories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        selectedCategory === cat ? 'bg-[#1E40AF] text-white' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Package size={16} style={{ color: selectedCategory === cat ? 'white' : '#6B7280' }} />
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Compteur */}
        <div className="px-4 py-3 text-center">
          <span className="text-sm text-gray-500">
            <span className="font-bold text-gray-900">{productCount}</span> résultats
          </span>
        </div>
      </div>
    </aside>
  )
}
