// EmploiFilters.tsx — Barre pills + panneau filtres slide-in gauche
// Fidèle à Emergent JobsPage.jsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, MapPin, Building2, X, Filter, Users, Award } from 'lucide-react'

const JOB_TYPES = [
  { id: 'cdi', label: 'CDI' },
  { id: 'cdd', label: 'CDD' },
  { id: 'interim', label: 'Intérim' },
  { id: 'apprentissage', label: 'Apprentissage' },
  { id: 'stage', label: 'Stage' },
  { id: 'freelance', label: 'Freelance' },
]

const METIERS = [
  'Électricien', 'Plombier', 'Maçon', 'Carreleur', 'Peintre', 'Menuisier',
  'Charpentier', 'Couvreur', 'Chauffagiste', 'Climaticien', 'Plaquiste',
  'Pisciniste', 'Paysagiste', 'Façadier', 'Chef de chantier', 'Conducteur de travaux',
]

const EXPERIENCE_LEVELS = [
  { id: 'debutant', label: 'Débutant accepté' },
  { id: '1-3', label: '1-3 ans' },
  { id: '3-5', label: '3-5 ans' },
  { id: '5+', label: '5+ ans' },
]

const POPULAR_CITIES = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Nantes', 'Nice', 'Strasbourg', 'Montpellier', 'Lille']

interface Props {
  contractType: string
  city: string
  metier: string
  onContractTypeChange: (v: string) => void
  onCityChange: (v: string) => void
  onMetierChange: (v: string) => void
  resultCount: number
}

export default function EmploiFilters({ contractType, city, metier, onContractTypeChange, onCityChange, onMetierChange, resultCount }: Props) {
  const [showPanel, setShowPanel] = useState(false)
  const [panelType, setPanelType] = useState(contractType)
  const [panelCity, setPanelCity] = useState(city)
  const [panelMetier, setPanelMetier] = useState(metier)

  const applyFilters = () => {
    onContractTypeChange(panelType)
    onCityChange(panelCity)
    onMetierChange(panelMetier)
    setShowPanel(false)
  }

  const clearAll = () => {
    onContractTypeChange('')
    onCityChange('')
    onMetierChange('')
    setPanelType('')
    setPanelCity('')
    setPanelMetier('')
    setShowPanel(false)
  }

  const typeLabel = JOB_TYPES.find((t) => t.id === contractType)?.label

  return (
    <>
      {/* Barre pills */}
      <div style={{ background: '#F3F4F6', borderBottom: '1px solid #E5E7EB', padding: '4px 0' }}>
        <div className="hide-scrollbar-emploi" style={{ display: 'flex', gap: '8px', padding: '12px 16px', overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', maxWidth: '1400px', margin: '0 auto' }}>
          <button onClick={() => { setPanelType(contractType); setPanelCity(city); setPanelMetier(metier); setShowPanel(true) }} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: contractType ? '#FFF8F4' : '#FFFFFF', border: contractType ? '1.5px solid #E8650A' : '1.5px solid #E5E7EB', borderRadius: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: contractType ? '600' : '500', color: contractType ? '#E8650A' : '#1a2a4a', whiteSpace: 'nowrap', cursor: 'pointer' }}>
            <Briefcase size={14} color={contractType ? '#E8650A' : '#1a2a4a'} />
            {typeLabel || 'Type de contrat'}
            {contractType && <span style={{ background: '#E8650A', color: '#FFFFFF', borderRadius: '10px', padding: '1px 6px', fontSize: '10px', fontWeight: '700' }}>1</span>}
          </button>
          <button onClick={() => { setPanelType(contractType); setPanelCity(city); setPanelMetier(metier); setShowPanel(true) }} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: city ? '#FFF8F4' : '#FFFFFF', border: city ? '1.5px solid #E8650A' : '1.5px solid #E5E7EB', borderRadius: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: city ? '600' : '500', color: city ? '#E8650A' : '#1a2a4a', whiteSpace: 'nowrap', cursor: 'pointer' }}>
            <MapPin size={14} color={city ? '#E8650A' : '#1a2a4a'} />
            {city || 'Ville'}
          </button>
          <button onClick={() => { setPanelType(contractType); setPanelCity(city); setPanelMetier(metier); setShowPanel(true) }} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: metier ? '#FFF8F4' : '#FFFFFF', border: metier ? '1.5px solid #E8650A' : '1.5px solid #E5E7EB', borderRadius: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: metier ? '600' : '500', color: metier ? '#E8650A' : '#1a2a4a', whiteSpace: 'nowrap', cursor: 'pointer' }}>
            <Building2 size={14} color={metier ? '#E8650A' : '#1a2a4a'} />
            {metier || 'Secteur'}
          </button>
          <style>{`.hide-scrollbar-emploi::-webkit-scrollbar { display: none; }`}</style>
        </div>
      </div>

      {/* Panneau filtres slide-in GAUCHE */}
      <AnimatePresence>
        {showPanel && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPanel(false)} className="fixed inset-0 bg-black/50 z-[60]" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col">
              {/* Header bleu */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100" style={{ background: '#1E40AF' }}>
                <h2 className="text-lg font-bold text-white flex items-center gap-2"><Filter size={20} />Filtrer les offres</h2>
                <button onClick={() => setShowPanel(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"><X size={18} className="text-white" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Type de contrat */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Briefcase size={16} className="text-[#1E40AF]" />Type de contrat</h3>
                  <div className="space-y-2">
                    {JOB_TYPES.map((type) => (
                      <label key={type.id} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="jobType" checked={panelType === type.id} onChange={() => setPanelType(panelType === type.id ? '' : type.id)} className="w-4 h-4 text-[#1E40AF] border-gray-300" />
                        <span className="text-gray-700">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Métier */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Users size={16} className="text-[#1E40AF]" />Métier</h3>
                  <select value={panelMetier} onChange={(e) => setPanelMetier(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] outline-none">
                    <option value="">Tous les métiers</option>
                    {METIERS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Expérience */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Award size={16} className="text-[#1E40AF]" />Expérience</h3>
                  <div className="space-y-2">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <label key={level.id} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-[#1E40AF] border-gray-300 rounded" />
                        <span className="text-gray-700">{level.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ville */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><MapPin size={16} className="text-[#1E40AF]" />Ville</h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_CITIES.map((c) => (
                      <button key={c} onClick={() => setPanelCity(panelCity === c ? '' : c)} className={`px-3 py-1.5 rounded-full text-sm transition-colors ${panelCity === c ? 'bg-[#1E40AF] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 space-y-2">
                <button onClick={clearAll} className="w-full py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors">Réinitialiser les filtres</button>
                <button onClick={applyFilters} className="w-full py-3 bg-[#F97316] text-white font-bold rounded-xl hover:bg-[#EA580C] transition-colors">Voir {resultCount} offres</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
