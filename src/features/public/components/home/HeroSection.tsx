import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, Wrench, ShoppingCart, ArrowRight } from 'lucide-react'

const HERO_IMAGE = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/7m97fd6q_Image%20AbracadaBati%20OK.png'

const TABS = [
  { id: 'projet', label: 'projet', icon: FileText, color: '#F97316', desc: 'Décris ton projet — Reçois jusqu\'à 5 devis\nd\'artisans certifiés en 24h', placeholder: 'Ex: Rénovation salle de bain, installation électrique...', btn: 'Obtenir mes devis gratuits', path: '/contact' },
  { id: 'artisan', label: 'artisan', icon: Wrench, color: '#10B981', desc: 'Trouve un artisan certifié près de chez toi', placeholder: 'Quel métier ? (plombier, électricien...)', btn: 'Trouver un artisan', path: '/discover' },
  { id: 'acheter', label: 'Acheter', icon: ShoppingCart, color: '#1E40AF', desc: 'Matériaux et outillage au meilleur prix', placeholder: 'Ex: Carrelage, perceuse, peinture...', btn: 'Voir le marketplace', path: '/shops' },
]

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('projet')
  const navigate = useNavigate()
  const tab = TABS.find((t) => t.id === activeTab)!

  return (
    <section>
      {/* Image */}
      <div className="relative w-full" style={{ backgroundColor: '#1a2a4a' }}>
        <img src={HERO_IMAGE} alt="AbracadaBati — 1er Centre Commercial Virtuel du Bâtiment" loading="eager" className="w-full block" style={{ height: '220px', objectFit: 'cover', objectPosition: 'center 55%' }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '80px', background: 'linear-gradient(to bottom, transparent 0%, rgba(26, 42, 74, 0.65) 45%, #1a2a4a 100%)' }} />
        {/* Desktop badge */}
        <div className="hidden lg:flex absolute top-6 left-1/2 -translate-x-1/2 items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}>
          <span className="text-white text-sm">🔥 <span style={{ color: '#E8650A', fontWeight: 700 }}>100</span> places Fondateur restantes sur 100</span>
        </div>
      </div>

      {/* Social proof */}
      <div className="text-center py-1.5 px-4" style={{ backgroundColor: '#1a2a4a' }}>
        <span className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>+300 000 personnes ont suivi 3 ans de construction.</span>
        <br />
        <Link to="/a-propos" className="text-[11px] font-bold text-white no-underline">
          Aujourd'hui — Bienvenue chez toi. <span style={{ color: '#F97316', fontWeight: 700 }}>→</span>
        </Link>
      </div>

      {/* Card with tabs */}
      <div style={{ backgroundColor: '#1a2a4a', padding: 0 }}>
        <div className="bg-white overflow-hidden" style={{ borderRadius: '14px 14px 0 0' }}>
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: '1px solid #f3f4f6', height: '38px' }}>
            {TABS.map((t) => {
              const isActive = activeTab === t.id
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)} className="flex-1 flex items-center justify-center gap-1 transition-all" style={{
                  padding: '10px 8px', color: isActive ? '#E8650A' : '#9ca3af', fontWeight: isActive ? 600 : 400, fontSize: '13px',
                  borderBottom: isActive ? '2px solid #E8650A' : '2px solid transparent',
                }}>
                  <t.icon size={14} style={{ color: isActive ? '#E8650A' : '#9ca3af' }} />
                  <span>{t.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <div className="p-3">
            <p className="text-center text-xs mb-2" style={{ color: '#374151', lineHeight: 1.35 }}>{tab.desc}</p>
            <input type="text" placeholder={tab.placeholder} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-2 mb-2" style={{ '--tw-ring-color': `${tab.color}33` } as React.CSSProperties} />
            <button onClick={() => navigate(tab.path)} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90" style={{ backgroundColor: tab.color }}>
              {tab.btn} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
