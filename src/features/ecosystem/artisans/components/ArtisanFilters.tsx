// ArtisanFilters.tsx — Fidèle à Emergent ArtisansPage.jsx
// Barre filtres #F3F4F6 + panneau slide-in métiers/villes/vérifié

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, MapPin, Star, X, Check } from 'lucide-react'
import type { ArtisanFilters as Filters } from '../types/artisan'

const METIERS = [
  'Plombier', 'Électricien', 'Maçon', 'Carreleur', 'Peintre', 'Menuisier',
  'Couvreur', 'Chauffagiste', 'Pisciniste', 'Paysagiste', 'Jardinier',
  'Climaticien', 'Façadier', 'Serrurier', 'Vitrier', 'Charpentier',
]

const VILLES = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Bordeaux',
  'Nantes', 'Lille', 'Strasbourg', 'Montpellier', 'Rennes',
  'Aix-en-Provence', 'Dijon', 'Grenoble', 'Toulon',
]

interface Props {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export default function ArtisanFiltersBar({ filters, onFiltersChange }: Props) {
  const [showPanel, setShowPanel] = useState(false)
  const [showCitySearch, setShowCitySearch] = useState(false)
  const [panelMetier, setPanelMetier] = useState(filters.metier)
  const [panelCity, setPanelCity] = useState(filters.city)
  const [panelVerified, setPanelVerified] = useState(filters.verified)

  const applyFilters = () => {
    onFiltersChange({ metier: panelMetier, city: panelCity, verified: panelVerified })
    setShowPanel(false)
  }

  const clearFilters = () => {
    onFiltersChange({ metier: '', city: '', verified: false })
  }

  return (
    <>
      {/* Barre de Filtres */}
      <div
        style={{
          background: '#F3F4F6',
          borderBottom: '1px solid #E5E7EB',
          padding: '12px 0',
        }}
      >
        <div
          className="hide-scrollbar"
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
            onClick={() => { setPanelMetier(filters.metier); setPanelCity(filters.city); setPanelVerified(filters.verified); setShowPanel(true) }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: filters.metier ? '#FFF8F4' : '#FFFFFF',
              border: filters.metier ? '2px solid #E8650A' : '2px solid #E5E7EB',
              borderRadius: '24px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '14px',
              fontWeight: filters.metier ? '600' : '500',
              color: filters.metier ? '#E8650A' : '#1a2a4a',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <SlidersHorizontal size={16} color={filters.metier ? '#E8650A' : '#1a2a4a'} />
            Métiers & Filtres
            {filters.metier && (
              <span style={{ background: '#E8650A', color: '#FFFFFF', borderRadius: '10px', padding: '1px 6px', fontSize: '10px', fontWeight: '700' }}>1</span>
            )}
          </button>

          <button
            onClick={() => setShowCitySearch(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: filters.city ? '#FFF8F4' : '#FFFFFF',
              border: filters.city ? '2px solid #E8650A' : '2px solid #E5E7EB',
              borderRadius: '24px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '14px',
              fontWeight: filters.city ? '600' : '500',
              color: filters.city ? '#E8650A' : '#1a2a4a',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <MapPin size={16} color={filters.city ? '#E8650A' : '#1a2a4a'} />
            {filters.city || 'Ville'}
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: '#FFFFFF',
              border: '2px solid #E5E7EB',
              borderRadius: '24px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '14px',
              fontWeight: '500',
              color: '#1a2a4a',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <Star size={16} color="#1a2a4a" />
            Note
          </button>
        </div>

        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      </div>

      {/* Filtres actifs */}
      <AnimatePresence>
        {(filters.metier || filters.city) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-gray-200"
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Filtres actifs :</span>
                {filters.metier && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 bg-[#1E40AF]/10 text-[#1E40AF] px-3 py-1.5 rounded-full text-sm font-medium">
                    {filters.metier}
                    <button onClick={() => onFiltersChange({ ...filters, metier: '' })} className="hover:bg-[#1E40AF]/20 rounded-full p-0.5"><X size={14} /></button>
                  </motion.span>
                )}
                {filters.city && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] px-3 py-1.5 rounded-full text-sm font-medium">
                    <MapPin size={14} />{filters.city}
                    <button onClick={() => onFiltersChange({ ...filters, city: '' })} className="hover:bg-[#F97316]/20 rounded-full p-0.5"><X size={14} /></button>
                  </motion.span>
                )}
                <button onClick={clearFilters} className="text-sm text-red-600 ml-auto hover:underline font-medium">Effacer tout</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panneau Filtres Slide-in */}
      <AnimatePresence>
        {showPanel && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowPanel(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-md bg-white z-50 overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Filtres</h3>
                <button onClick={() => setShowPanel(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={22} className="text-gray-500" /></button>
              </div>

              <div className="p-4 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Métier</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {METIERS.map((m) => (
                      <button
                        key={m}
                        onClick={() => setPanelMetier(panelMetier === m ? '' : m)}
                        className={`p-3 rounded-xl text-sm font-medium text-left transition-colors ${panelMetier === m ? 'bg-[#1E40AF]/10 text-[#1E40AF] border-2 border-[#1E40AF]' : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Ville</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {VILLES.map((v) => (
                      <button
                        key={v}
                        onClick={() => setPanelCity(panelCity === v ? '' : v)}
                        className={`p-3 rounded-xl text-sm font-medium text-left transition-colors ${panelCity === v ? 'bg-[#F97316]/10 text-[#F97316] border-2 border-[#F97316]' : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setPanelVerified(!panelVerified)}
                    className="flex items-center justify-between w-full p-4 rounded-xl border-2 transition-colors"
                    style={{ borderColor: panelVerified ? '#10B981' : '#E5E7EB', background: panelVerified ? '#F0FDF4' : '#FFFFFF' }}
                  >
                    <span className="font-medium text-gray-900">Artisans vérifiés uniquement</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${panelVerified ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                      {panelVerified && <Check size={14} className="text-white" />}
                    </div>
                  </button>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-3">
                <button onClick={() => { setPanelMetier(''); setPanelCity(''); setPanelVerified(false) }} className="flex-1 py-3 rounded-xl border border-gray-200 font-medium text-gray-700">Réinitialiser</button>
                <button onClick={applyFilters} className="flex-1 py-3 rounded-xl text-white font-semibold" style={{ background: '#E8650A' }}>Appliquer</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Recherche Ville */}
      <AnimatePresence>
        {showCitySearch && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCitySearch(false)} />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[70vh] overflow-hidden"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MapPin size={20} className="text-[#F97316]" />
                  Rechercher une ville
                </h3>
                <button onClick={() => setShowCitySearch(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={20} /></button>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2 overflow-y-auto max-h-[50vh]">
                {VILLES.map((v) => (
                  <button
                    key={v}
                    onClick={() => { onFiltersChange({ ...filters, city: v }); setShowCitySearch(false) }}
                    className={`p-3 rounded-xl text-sm font-medium text-left transition-colors ${filters.city === v ? 'bg-[#F97316]/10 text-[#F97316] border-2 border-[#F97316]' : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
