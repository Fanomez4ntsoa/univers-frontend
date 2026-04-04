// HeroSection.tsx — Fidèle à ~/project/AbracadaBati/frontend/src/pages/HomePage.jsx
// 3 versions responsive : Mobile (<768px) / Tablette (768-1023px) / Desktop (>=1024px)
// CSS inline exact copié depuis Emergent — pas d'interprétation Tailwind

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Wrench, ShoppingCart, Search } from 'lucide-react'

const HERO_IMG_MOBILE = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/7m97fd6q_Image%20AbracadaBati%20OK.png'
const HERO_IMG_DESKTOP = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/vmqcv6sk_Image%20AbracadaBati%20OK.png'

const TABS = [
  { id: 'projet', label: 'projet', icon: FileText, color: '#F97316', desc: 'Décris ton projet — Reçois jusqu\'à 5 devis\nd\'artisans certifiés en 24h', placeholder: 'Ex: Rénovation salle de bain, installation électrique...', btn: 'Obtenir mes devis gratuits', path: '/contact' },
  { id: 'artisan', label: 'artisan', icon: Wrench, color: '#10B981', desc: 'Trouve un artisan certifié près de chez toi', placeholder: 'Quel métier ? (plombier, électricien...)', btn: 'Trouver un artisan', path: '/artisans' },
  { id: 'acheter', label: 'Acheter', icon: ShoppingCart, color: '#1E40AF', desc: 'Matériaux et outillage au meilleur prix', placeholder: 'Ex: Carrelage, perceuse, peinture...', btn: 'Voir le marketplace', path: '/shops' },
]

export default function HeroSection() {
  const [searchTab, setSearchTab] = useState('projet')
  const navigate = useNavigate()
  const tab = TABS.find((t) => t.id === searchTab)!

  return (
    <>
      {/* ═══ CSS RESPONSIVE HERO ═══ */}
      <style>{`
        .mobile-hero-img { object-position: center 18%; }
        @media (max-width: 767px) {
          .mobile-hero-img { object-position: center 55% !important; }
        }
        @media (max-width: 375px) {
          .mobile-hero-img { height: 190px !important; object-position: center 55% !important; }
          .mobile-social-zone { padding: 6px 12px !important; }
          .mobile-social-line1 { font-size: 10px !important; }
          .mobile-social-line2 { font-size: 11px !important; }
          .mobile-card-desc { font-size: 12px !important; }
          .mobile-card-input { font-size: 11px !important; }
          .mobile-card-btn { font-size: 13px !important; padding: 11px !important; }
        }
        .mobile-proof-arrow:hover { transform: translateX(3px); }
        .proof-block-tablet:hover .proof-tablet-arrow { transform: translateX(3px); }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          VERSION MOBILE (<768px)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="md:hidden">
        {/* IMAGE — hauteur fixe 200px (190px sur ≤375px) */}
        <div className="relative w-full" style={{ backgroundColor: '#1a2a4a' }}>
          <img
            src={HERO_IMG_MOBILE}
            alt="AbracadaBati — 1er Centre Commercial Virtuel du Bâtiment"
            loading="eager"
            className="w-full block mobile-hero-img"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              margin: 0,
              padding: 0,
              borderRadius: 0,
              display: 'block',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: '80px',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(26, 42, 74, 0.65) 45%, #1a2a4a 100%)',
            }}
          />
        </div>

        {/* ZONE PREUVE SOCIALE */}
        <div
          className="mobile-social-zone"
          style={{
            backgroundColor: '#1a2a4a',
            padding: '6px 16px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1px',
          }}
        >
          <span
            className="mobile-social-line1"
            style={{
              fontSize: '10px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.80)',
              lineHeight: 1.3,
              letterSpacing: '0.01em',
              display: 'block',
            }}
          >
            +300 000 personnes ont suivi 3 ans de construction.
          </span>
          <a
            href="/a-propos"
            style={{ textDecoration: 'none', cursor: 'pointer', display: 'block' }}
          >
            <span
              className="mobile-social-line2"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.3,
                letterSpacing: '0.01em',
              }}
            >
              Aujourd'hui — Bienvenue chez toi.
            </span>
            <span
              className="mobile-proof-arrow"
              style={{
                color: '#F97316',
                fontWeight: 700,
                fontSize: '12px',
                marginLeft: '3px',
                display: 'inline-block',
                transition: 'transform 0.15s ease',
              }}
            >
              →
            </span>
          </a>
        </div>

        {/* SLOGAN — Bienvenue chez toi. */}
        <div className="hero-slogan">
          <p>Bienvenue chez toi<span>.</span></p>
        </div>

        {/* CARTE BLANCHE */}
        <div className="hero-card-container" style={{ backgroundColor: '#1a2a4a', padding: '0', margin: 0 }}>
          <div
            className="bg-white overflow-hidden"
            style={{ borderRadius: '14px 14px 0 0', margin: 0, padding: 0 }}
          >
            {/* Onglets — 38px */}
            <div className="flex" style={{ borderBottom: '1px solid #f3f4f6', height: '38px' }}>
              {TABS.map((t) => {
                const isActive = searchTab === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setSearchTab(t.id)}
                    className="flex-1 flex items-center justify-center gap-1 transition-all"
                    style={{
                      padding: '10px 8px',
                      color: isActive ? '#E8650A' : '#9ca3af',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '13px',
                      borderBottom: isActive ? '2px solid #E8650A' : '2px solid transparent',
                      textAlign: 'center',
                    }}
                  >
                    <t.icon size={14} style={{ color: isActive ? '#E8650A' : '#9ca3af' }} />
                    <span>{t.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Contenu onglet */}
            <div>
              <p
                className="text-center mobile-card-desc"
                style={{
                  fontSize: '12px',
                  color: '#374151',
                  padding: '8px 12px 4px',
                  lineHeight: 1.35,
                  display: 'block',
                  margin: 0,
                }}
              >
                {tab.id === 'projet'
                  ? <>Décris ton projet — Reçois jusqu'à 5 devis<br />d'artisans certifiés en 24h</>
                  : tab.desc}
              </p>
              <div style={{ margin: '0 12px 6px' }}>
                <input
                  type="text"
                  placeholder={tab.placeholder}
                  className={`w-full focus:outline-none focus:ring-2 mobile-card-input ${tab.id === 'projet' ? 'focus:ring-[#F97316]/20' : tab.id === 'artisan' ? 'focus:ring-emerald-500/20' : 'focus:ring-blue-500/20'}`}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '9px 10px',
                    fontSize: '11px',
                    boxSizing: 'border-box',
                    height: '40px',
                    width: '100%',
                  }}
                />
              </div>
              <div style={{ margin: '0 12px 12px' }}>
                <button
                  onClick={() => navigate(tab.path)}
                  className="w-full text-white font-bold mobile-card-btn"
                  style={{
                    background: tab.color,
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'block',
                    textAlign: 'center',
                    height: '44px',
                    width: '100%',
                  }}
                >
                  {tab.btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VERSION TABLETTE (768-1023px)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="hidden md:block lg:hidden">
        {/* IMAGE — Tablette */}
        <div className="relative w-full" style={{ backgroundColor: '#1E3A5F' }}>
          <img
            src={HERO_IMG_DESKTOP}
            alt="AbracadaBati — 1er Centre Commercial Virtuel du Bâtiment"
            loading="eager"
            className="w-full block"
            style={{
              height: 'auto',
              maxHeight: '420px',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              margin: 0,
              padding: 0,
              borderRadius: 0,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: '140px',
              background: 'linear-gradient(transparent 0%, rgba(30, 58, 95, 0.7) 50%, #1E3A5F 100%)',
            }}
          />
        </div>

        {/* Zone bleue + preuve sociale + carte */}
        <div style={{ backgroundColor: '#1E3A5F', padding: '16px 20px 20px', margin: 0 }}>
          <a
            href="/a-propos"
            className="proof-block-tablet block text-center mb-4"
            style={{ textDecoration: 'none', cursor: 'pointer', transition: 'opacity 0.15s ease' }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.90)',
                display: 'block',
                lineHeight: 1.5,
                marginBottom: '2px',
              }}
            >
              +300 000 personnes ont suivi 3 ans de construction.
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                display: 'block',
              }}
            >
              Aujourd'hui — Bienvenue chez toi.{' '}
              <span
                className="proof-tablet-arrow"
                style={{
                  color: '#F97316',
                  fontWeight: 700,
                  display: 'inline-block',
                  transition: 'transform 0.15s ease',
                }}
              >
                →
              </span>
            </span>
          </a>

          {/* Carte centrée */}
          <div
            className="bg-white overflow-hidden mx-auto"
            style={{
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              maxWidth: '600px',
            }}
          >
            {/* Onglets tablette */}
            <div className="flex" style={{ borderBottom: '0.5px solid #e5e7eb' }}>
              {TABS.map((t) => {
                const isActive = searchTab === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setSearchTab(t.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 transition-all"
                    style={{
                      padding: '14px 8px',
                      color: isActive ? '#E8650A' : '#6b7280',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '14px',
                      borderBottom: isActive ? '2px solid #E8650A' : '2px solid transparent',
                    }}
                  >
                    <span>{t.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Contenu */}
            <div className="p-5">
              <p className="text-center text-gray-600 text-sm mb-4">
                {tab.id === 'projet'
                  ? 'Décris ton projet — Reçois jusqu\'à 5 devis d\'artisans certifiés en 24h'
                  : tab.desc}
              </p>
              <input
                type="text"
                placeholder={tab.placeholder}
                className="w-full mb-3 focus:outline-none focus:ring-2"
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: '14px',
                }}
              />
              <button
                onClick={() => navigate(tab.path)}
                className="w-full text-white font-bold"
                style={{
                  background: tab.color,
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: '15px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {tab.btn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VERSION DESKTOP (>=1024px) — Hero plein écran
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="hidden lg:block">
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100vh',
          }}
        >
          {/* IMAGE — 100vh, cover, center 35% */}
          <img
            src={HERO_IMG_DESKTOP}
            alt="AbracadaBati — 1er Centre Commercial Virtuel du Bâtiment"
            loading="eager"
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center 35%',
              display: 'block',
            }}
          />

          {/* GRADIENT CINÉMATIQUE */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.45) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* COMPTEUR FONDATEURS — pilule */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(50% - 85px)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              background: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '999px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                padding: '10px 28px 8px',
              }}
            >
              🔥 <span style={{ color: '#E8650A', fontWeight: 700 }}>100</span> places Fondateur restantes sur 100
            </span>
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.25)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#E8650A',
                }}
              />
            </div>
          </div>

          {/* CARTE FLOTTANTE GLASSMORPHISM */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(50% + 65px)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              maxWidth: '90vw',
              zIndex: 2,
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.3)',
              borderTop: '3px solid #E8650A',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 8px 20px rgba(0, 0, 0, 0.20)',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            {/* ONGLETS */}
            <div className="flex" style={{ borderBottom: '1px solid #f3f4f6' }}>
              {TABS.map((t) => {
                const isActive = searchTab === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setSearchTab(t.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 transition-all relative"
                    style={{
                      padding: '10px 12px',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#E8650A' : '#9ca3af',
                      borderBottom: isActive ? '2px solid #E8650A' : '2px solid transparent',
                    }}
                  >
                    <t.icon size={13} style={{ color: isActive ? '#E8650A' : '#9ca3af' }} />
                    <span>{t.label}</span>
                  </button>
                )
              })}
            </div>

            {/* CONTENU */}
            <div style={{ padding: '10px 16px 14px' }}>
              <p
                className="text-center"
                style={{ fontSize: '13px', color: '#374151', marginBottom: '8px' }}
              >
                {tab.id === 'projet'
                  ? 'Décris ton projet — Reçois jusqu\'à 5 devis d\'artisans certifiés en 24h'
                  : tab.desc}
              </p>
              <input
                type="text"
                placeholder={tab.placeholder}
                className="w-full focus:outline-none focus:ring-2"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '12px',
                  boxSizing: 'border-box',
                  marginBottom: '8px',
                  width: '100%',
                }}
              />
              <button
                onClick={() => navigate(tab.path)}
                className="w-full text-white font-bold flex items-center justify-center gap-2"
                style={{
                  background: tab.color,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: `0 4px 16px ${tab.color}66`,
                  width: '100%',
                }}
              >
                {tab.id === 'projet' && <FileText size={14} />}
                {tab.id === 'artisan' && <Wrench size={14} />}
                {tab.id === 'acheter' && <Search size={14} />}
                {tab.btn}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
