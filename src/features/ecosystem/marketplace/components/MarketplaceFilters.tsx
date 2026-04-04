// MarketplaceFilters.tsx — Fidèle à Emergent barre filtres rapides
// Boutons pill inline styles exacts

import { SlidersHorizontal, Euro, Tag } from 'lucide-react'

interface Props {
  activeFiltersCount: number
  onOpenFilters: () => void
}

export default function MarketplaceFilters({ activeFiltersCount, onOpenFilters }: Props) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #F3F4F6',
    }}>
      <div
        className="hide-scrollbar-mp"
        style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Bouton Catégories & Filtres */}
        <button
          onClick={onOpenFilters}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: activeFiltersCount > 0 ? '#FFF8F4' : '#FFFFFF',
            border: activeFiltersCount > 0 ? '1.5px solid #E8650A' : '1.5px solid #E5E7EB',
            borderRadius: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '13px',
            fontWeight: activeFiltersCount > 0 ? '600' : '500',
            color: activeFiltersCount > 0 ? '#E8650A' : '#1a2a4a',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          <SlidersHorizontal size={14} color={activeFiltersCount > 0 ? '#E8650A' : '#1a2a4a'} />
          Catégories & Filtres
          {activeFiltersCount > 0 && (
            <span style={{
              background: '#E8650A',
              color: '#FFFFFF',
              borderRadius: '10px',
              padding: '1px 6px',
              fontSize: '10px',
              fontWeight: '700',
            }}>
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Bouton Prix */}
        <button
          onClick={onOpenFilters}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: '#FFFFFF',
            border: '1.5px solid #E5E7EB',
            borderRadius: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '13px',
            fontWeight: '500',
            color: '#1a2a4a',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          <Euro size={14} color="#1a2a4a" />
          Prix
        </button>

        {/* Bouton Marque */}
        <button
          onClick={onOpenFilters}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: '#FFFFFF',
            border: '1.5px solid #E5E7EB',
            borderRadius: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '13px',
            fontWeight: '500',
            color: '#1a2a4a',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          <Tag size={14} color="#1a2a4a" />
          Marque
        </button>
      </div>

      <style>{`.hide-scrollbar-mp::-webkit-scrollbar { display: none; }`}</style>
    </div>
  )
}
