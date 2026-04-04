// PublicHeader.tsx — Fidèle à Emergent UnifiedHeader.jsx + MainNavigation.jsx
// CSS inline exact copié depuis Emergent — pas d'interprétation Tailwind

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, X, Plus, Rocket, User, ChevronRight,
  Home, Users, Store, Megaphone, Network, Briefcase, Building2, LayoutDashboard,
  Crown, Eye, Target, Handshake, UserPlus, TrendingUp, MapPin, Star, Clock,
  Bot, Package,
} from 'lucide-react'
import { getStoredProfile } from '../../../auth/hooks/useAuth'
import TopBanner from '../home/TopBanner'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/4450nlnf_abracadabait_logo_transparent.png'

const NAV_ITEMS = [
  { path: '/', label: '', icon: Home, iconOnly: true },
  { path: '/artisans', label: 'Artisans', icon: Users, iconOnly: false },
  { path: '/produits', label: 'Marketplace', icon: Store, iconOnly: false },
  { path: '/annonces', label: 'Particuliers', icon: Megaphone, iconOnly: false },
  { path: '/reseau', label: 'Réseau', icon: Network, iconOnly: false },
  { path: '/emploi', label: 'Emploi', icon: Briefcase, iconOnly: false },
  { path: '/reseau-pros', label: 'Réseau Pro', icon: Building2, iconOnly: false },
  { path: '/espace-pro', label: 'Espace Pro', icon: LayoutDashboard, iconOnly: false },
]

// Items du menu hamburger — ordre exact Emergent
const MENU_NAV_ITEMS = [
  { path: '/', label: 'Accueil', icon: Home },
  { path: '/artisans', label: 'Artisans', icon: Users },
  { path: '/produits', label: 'Marketplace', icon: Store },
  { path: '/annonces', label: 'Entre particuliers', icon: Megaphone },
  { path: '/reseau', label: 'Réseau social', icon: Network },
  { path: '/emploi', label: 'Emploi', icon: Briefcase },
  { path: '/reseau-pros', label: 'Réseau Pros', icon: Building2 },
  { path: '/espace-pro', label: 'Espace Pro', icon: Crown },
]

const PRO_SECTION = [
  { path: '/register', label: 'Ouvrir ma boutique', icon: Store, desc: 'Vente de produits' },
  { path: '/login', label: 'Recevoir mon Cockpit + agents IA', icon: Bot, desc: 'Automatisation complète' },
  { path: '/discover', label: 'Gagner en visibilité', icon: Eye, desc: 'Référencement gratuit' },
  { path: '/contact', label: 'Trouver des chantiers', icon: Target, desc: 'Leads qualifiés' },
  { path: '/discover', label: 'Accéder au réseau pro', icon: Handshake, desc: 'Networking & entraide' },
  { path: '/discover', label: "Centrale d'achat", icon: Package, desc: 'Achats groupés -30%' },
  { path: '/jobs', label: 'Recruter / publier offres', icon: UserPlus, desc: 'Module emploi' },
]

const EXPLORE_SECTION = [
  { path: '/shops', label: 'Tendances', icon: TrendingUp },
  { path: '/discover', label: 'Près de chez moi', icon: MapPin },
  { path: '/shops', label: 'Populaire', icon: Star },
  { path: '/shops', label: 'Nouveaux', icon: Clock },
]

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const profile = getStoredProfile()
  const currentPath = '/' + (location.pathname.split('/')[1] || '')

  return (
    <>
      {/* ═══ TOP BANNER ═══ */}
      <TopBanner />

      {/* ═══════════════════════════════════════════════════════════════
          HEADER — fixed sous le banner
          Desktop: top 40px | Tablette: top 36px | Mobile: top 0
      ═══════════════════════════════════════════════════════════════ */}
      <header
        className="top-[36px] lg:top-[40px]"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          zIndex: 100,
          background: '#ffffff',
        }}
      >
        {/* ═══ MOBILE HEADER (< 768px) ═══ */}
        <div className="flex items-center justify-between md:hidden"
          style={{
            height: '52px',
            background: '#ffffff',
            padding: '0 12px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          {/* Gauche: Burger + Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex flex-col justify-center"
              style={{
                width: '20px',
                height: '20px',
                gap: '4px',
                padding: '0',
                marginLeft: '0px',
                background: 'transparent',
                border: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <span style={{ display: 'block', width: '20px', height: '2px', background: '#1a2a4a', borderRadius: '1px' }} />
              <span style={{ display: 'block', width: '14px', height: '2px', background: '#1a2a4a', borderRadius: '1px' }} />
              <span style={{ display: 'block', width: '20px', height: '2px', background: '#1a2a4a', borderRadius: '1px' }} />
            </button>

            <Link to="/" style={{ marginLeft: '-2px', display: 'flex', alignItems: 'center' }}>
              <img src={LOGO_URL} alt="AbracadaBati" style={{ height: '32px', width: 'auto' }} />
            </Link>
          </div>

          {/* Droite: Connexion + Loupe orange */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!profile && (
              <button
                onClick={() => navigate('/login')}
                style={{
                  border: '1.5px solid #e0e0e0',
                  borderRadius: '20px',
                  background: 'transparent',
                  color: '#555',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: '500',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Connexion
              </button>
            )}

            {profile && (
              <button
                onClick={() => navigate('/prospects')}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {profile.display_name?.substring(0, 2).toUpperCase() || 'AB'}
              </button>
            )}

            {/* Loupe recherche orange */}
            <button
              style={{
                width: '36px',
                height: '36px',
                background: '#E8650A',
                borderRadius: '50%',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Search size={16} style={{ color: '#ffffff' }} />
            </button>
          </div>
        </div>

        {/* ═══ DESKTOP + TABLET HEADER (>= 768px) ═══ */}
        <div className="hidden md:block" style={{ borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '64px', gap: '12px' }}>

              {/* Logo */}
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <img src={LOGO_URL} alt="AbracadaBati" style={{ height: '40px', width: 'auto' }} />
              </Link>

              {/* Search Bar — Desktop only (>=1024px) */}
              <form className="hidden lg:flex" style={{ flex: 1, maxWidth: '640px', position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                      type="text"
                      placeholder="Rechercher un artisan, un produit, une annonce..."
                      style={{
                        width: '100%',
                        height: '44px',
                        paddingLeft: '40px',
                        paddingRight: '12px',
                        background: 'transparent',
                        color: '#111827',
                        fontSize: '14px',
                        border: 'none',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      height: '44px',
                      padding: '0 20px',
                      background: '#3B82F6',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '0 12px 12px 0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Search size={17} />
                  </button>
                </div>
              </form>

              {/* Spacer quand pas de search bar (tablette) */}
              <div className="lg:hidden" style={{ flex: 1 }} />

              {/* Bouton Publier — Desktop only (>=1024px) */}
              <Link to="/listings" className="hidden lg:flex" style={{
                display: 'flex',
                alignItems: 'center',
                height: '40px',
                padding: '0 16px',
                border: '2px solid #F97316',
                color: '#F97316',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}>
                <Plus size={18} />
                <span>Publier</span>
              </Link>

              {/* CTA Fondateur — Desktop + Tablette (>=640px) */}
              <Link to="/register" style={{
                display: 'flex',
                alignItems: 'center',
                height: '40px',
                padding: '0 16px',
                background: 'linear-gradient(to right, #10b981, #059669)',
                color: '#ffffff',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(16,185,129,0.2)',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}>
                <Rocket size={16} />
                <span>Devenir Fondateur</span>
                <span style={{
                  marginLeft: '4px',
                  padding: '2px 6px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                }}>
                  1 AN OFFERT
                </span>
              </Link>

              {/* Connexion — Desktop + Tablette */}
              {profile ? (
                <Link to="/prospects" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(to bottom right, #1E40AF, #3B82F6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <User size={16} style={{ color: '#ffffff' }} />
                  </div>
                </Link>
              ) : (
                <Link to="/login" style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '40px',
                  padding: '0 12px',
                  border: '1px solid #d1d5db',
                  color: '#374151',
                  borderRadius: '12px',
                  fontWeight: 500,
                  fontSize: '14px',
                  textDecoration: 'none',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                }}>
                  <User size={16} />
                  <span className="hidden md:inline">Connexion</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ═══ SPACERS pour compenser le header fixed ═══ */}
      {/* Mobile (<768px): 52px */}
      <div className="md:hidden" style={{ height: '52px' }} />
      {/* Tablette (768-1023px): 64px */}
      <div className="hidden md:block lg:hidden" style={{ height: '64px' }} />
      {/* Desktop (>=1024px): 64px */}
      <div className="hidden lg:block" style={{ height: '64px' }} />

      {/* ═══════════════════════════════════════════════════════════════
          NAVIGATION SECONDAIRE — fidèle à MainNavigation.jsx
          Fixed sous le header
          Desktop: top 104px (40+64) | Tablette: top 100px (36+64) | Mobile: top 88px (36+52)
      ═══════════════════════════════════════════════════════════════ */}
      {/* Mobile: banner 36 + header 52 = 88px | Tablet: 36+64=100px | Desktop: 40+64=104px */}
      <nav
        className="top-[88px] md:top-[100px] lg:top-[104px]"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          backgroundColor: '#FFF8F4',
          borderBottom: '1px solid #FCE4D4',
          zIndex: 90,
        }}
      >
        {/* ═══ MOBILE (<768px) ═══ */}
        <div className="md:hidden">
          <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px',
              background: 'linear-gradient(to left, #FFF8F4, transparent)',
              pointerEvents: 'none', zIndex: 10,
            }} />
            <div
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              style={{
                WebkitOverflowScrolling: 'touch',
                marginLeft: '8px',
                paddingRight: '40px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {NAV_ITEMS.map((item, index) => {
                const isActive = currentPath === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                return (
                  <Link
                    key={item.path + item.label}
                    to={item.path}
                    className={`navbar-item whitespace-nowrap flex-shrink-0 ${isActive ? 'active' : ''}`}
                    style={{
                      paddingLeft: index === 0 ? '0px' : '6px',
                      paddingRight: index === 0 ? '0px' : '6px',
                      marginLeft: index === 1 ? '-20px' : '0px',
                      transform: 'translateY(3px)',
                      height: '44px',
                      fontSize: '12px',
                      fontWeight: isActive ? 600 : 500,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: isActive ? '#E8650A' : '#555555',
                      borderBottom: isActive ? '2px solid #E8650A' : '2px solid transparent',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: index === 0 ? '0px' : '3px',
                      textDecoration: 'none',
                    }}
                  >
                    <item.icon
                      size={item.iconOnly ? 16 : 13}
                      style={{ color: isActive ? '#E8650A' : '#888888' }}
                    />
                    {!item.iconOnly && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* ═══ TABLETTE (768-1023px) ═══ */}
        <div className="hidden md:block lg:hidden">
          <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px',
              background: 'linear-gradient(to left, #FFF8F4, transparent)',
              pointerEvents: 'none', zIndex: 10,
            }} />
            <div
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              style={{
                WebkitOverflowScrolling: 'touch',
                marginLeft: '16px',
                paddingRight: '40px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {NAV_ITEMS.map((item, index) => {
                const isActive = currentPath === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                return (
                  <Link
                    key={item.path + item.label}
                    to={item.path}
                    className={`navbar-item whitespace-nowrap flex-shrink-0 ${isActive ? 'active' : ''}`}
                    style={{
                      paddingLeft: index === 0 ? '0px' : '12px',
                      paddingRight: index === 0 ? '0px' : '12px',
                      marginLeft: index === 1 ? '-10px' : '0px',
                      transform: 'translateY(3px)',
                      height: '52px',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: isActive ? '#E8650A' : '#555555',
                      borderBottom: isActive ? '2px solid #E8650A' : '2px solid transparent',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: index === 0 ? '0px' : '6px',
                      textDecoration: 'none',
                    }}
                  >
                    <item.icon
                      size={item.iconOnly ? 20 : 16}
                      style={{ color: isActive ? '#E8650A' : '#888888' }}
                    />
                    {!item.iconOnly && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* ═══ DESKTOP (>=1024px) ═══ */}
        <div className="hidden lg:block" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div className="scrollbar-hide" style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path))
              return (
                <Link
                  key={item.path + item.label}
                  to={item.path}
                  className={`navbar-item relative flex items-center whitespace-nowrap transition-all ${isActive ? 'active' : ''}`}
                  style={{
                    fontSize: '14px',
                    padding: '14px 18px',
                    fontWeight: isActive ? 600 : 500,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: isActive ? '#E8650A' : '#555555',
                    borderBottom: isActive ? '2px solid #E8650A' : '2px solid transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <item.icon
                    size={item.iconOnly ? 20 : 18}
                    style={{ color: isActive ? '#E8650A' : '#888888' }}
                  />
                  {!item.iconOnly && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* ═══ SPACERS NAVIGATION ═══ */}
      {/* Mobile (<768px): 44px */}
      <div className="md:hidden" style={{ height: '44px' }} />
      {/* Tablette (768-1023px): 52px */}
      <div className="hidden md:block lg:hidden" style={{ height: '52px' }} />
      {/* Desktop (>=1024px): 48px */}
      <div className="hidden lg:block" style={{ height: '48px' }} />

      {/* ═══════════════════════════════════════════════════════════════
          MENU HAMBURGER PREMIUM - Slide-in depuis la GAUCHE
          Fidèle à Emergent UnifiedHeader.jsx lignes 1695-2137
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel — GAUCHE */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              {/* Header du menu avec safe area */}
              <div
                className="sticky top-0 bg-white border-b border-gray-100 z-10"
                style={{ paddingTop: 'max(44px, env(safe-area-inset-top, 44px))' }}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {profile ? (
                      <>
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {profile.display_name || 'Mon compte'}
                          </p>
                          <p className="text-xs text-gray-500">{profile.email || ''}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                          <User size={20} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Mon compte</p>
                          <p className="text-xs text-gray-500">Non connecté</p>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X size={22} className="text-gray-500" />
                  </button>
                </div>

                {/* CTA Devenir Fondateur */}
                <div className="px-4 pb-4">
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <div className="relative bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-3 overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="relative flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <Rocket size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-sm">Devenir Fondateur</p>
                          <p className="text-emerald-100 text-xs">Programme artisans • 1 an offert</p>
                        </div>
                        <ChevronRight size={20} className="text-white/70 flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Contenu du menu */}
              <div className="p-4 space-y-6">

                {/* ══════ NAVIGATION PRINCIPALE ══════ */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
                    Navigation
                  </p>
                  <nav className="space-y-1">
                    {MENU_NAV_ITEMS.map((item) => {
                      const itemPath = '/' + (item.path.split('/')[1] || '')
                      const isActive = currentPath === itemPath
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                            isActive
                              ? 'bg-[#1E40AF]/10 text-[#1E40AF]'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <item.icon size={20} className={isActive ? 'text-[#1E40AF]' : 'text-gray-400'} />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                {/* ══════ SECTION PRO ══════ */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center">
                      <Briefcase size={16} className="text-white" />
                    </div>
                    <p className="font-bold text-gray-900">Développer mon activité</p>
                  </div>
                  <nav className="space-y-1">
                    {PRO_SECTION.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-white/80 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                          <item.icon size={18} className="text-[#1E40AF]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500 truncate">{item.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* ══════ EXPLORATION ══════ */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
                    Explorer
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {EXPLORE_SECTION.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-3 bg-gray-50 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <item.icon size={18} className="text-gray-400" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ══════ CONNEXION SI NON CONNECTÉ ══════ */}
                {!profile && (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <button className="w-full h-12 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-semibold transition-colors">
                        Activer ma boutique
                      </button>
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <button className="w-full h-12 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                        J'ai déjà un compte
                      </button>
                    </Link>
                  </div>
                )}

                {/* Spacer safe area bottom */}
                <div className="h-8" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ CSS Navbar + Scrollbar hide ═══ */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .overflow-x-auto::-webkit-scrollbar { display: none; }
        .overflow-x-auto { -ms-overflow-style: none; scrollbar-width: none; }
        .navbar-item { color: #555555; border-bottom: 2px solid transparent; background: none; text-decoration: none; }
        .navbar-item svg { color: #888888; }
        .navbar-item.active { color: #E8650A; border-bottom: 2px solid #E8650A; background: none; font-weight: 600; }
        .navbar-item.active svg { color: #E8650A; }
        @media (hover: hover) {
          .navbar-item:hover { color: #E8650A; }
          .navbar-item:hover svg { color: #E8650A; }
        }
        @media (max-width: 768px) {
          .navbar-item { font-size: 12px; height: 44px; }
        }
        @media (min-width: 769px) and (max-width: 1023px) {
          .navbar-item { font-size: 15px; padding: 14px 20px; font-weight: 500; letter-spacing: 0.2px; }
          .navbar-item svg { width: 18px; height: 18px; }
          .navbar-item.active { font-weight: 600; }
        }
        @media (min-width: 1024px) {
          .navbar-item { font-size: 14px; padding: 14px 18px; }
        }
      `}</style>
    </>
  )
}
