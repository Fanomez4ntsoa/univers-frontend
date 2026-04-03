import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Plus, Rocket, Search, Home, Users, Store, Megaphone, Globe, Briefcase, Building2, LayoutDashboard } from 'lucide-react'
import { getStoredProfile } from '../../../auth/hooks/useAuth'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/4450nlnf_abracadabait_logo_transparent.png'

const NAV_ITEMS = [
  { label: '', icon: Home, path: '/' },
  { label: 'Artisans', icon: Users, path: '/artisans' },
  { label: 'Marketplace', icon: Store, path: '/produits' },
  { label: 'Particuliers', icon: Megaphone, path: '/annonces' },
  { label: 'Réseau', icon: Globe, path: '/feed' },
  { label: 'Emploi', icon: Briefcase, path: '/jobs' },
  { label: 'Réseau Pro', icon: Building2, path: '/discover' },
  { label: 'Espace Pro', icon: LayoutDashboard, path: '/login' },
]

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const profile = getStoredProfile()

  return (
    <>
      {/* Banner */}
      <div className="bg-[#F97316] text-white text-center text-xs py-1.5 px-4 font-medium">
        Site en démonstration – Réservé aux pros – Ouverture au public le 1er Juillet 2026
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img src={LOGO_URL} alt="AbracadaBati" className="h-9 w-auto" />
            </Link>

            {/* Search — desktop */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Rechercher un artisan, un produit, une annonce..." className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/20" />
              </div>
            </div>

            {/* Buttons — desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/listings" className="flex items-center gap-1 px-3 py-2 border border-[#F97316] text-[#F97316] rounded-lg text-sm font-medium hover:bg-[#F97316] hover:text-white transition-colors">
                <Plus className="w-4 h-4" /> Publier
              </Link>
              <Link to="/register" className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all">
                <Rocket className="w-4 h-4" /> Devenir Fondateur
                <span className="ml-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">1 AN OFFERT</span>
              </Link>
              {profile ? (
                <Link to="/prospects" className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <div className="w-7 h-7 bg-[#1E40AF]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#1E40AF] font-semibold text-xs">{profile.display_name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Mon espace</span>
                </Link>
              ) : (
                <Link to="/login" className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Connexion</Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Nav — exact from MainNavigation */}
        <nav className="border-t border-gray-100 overflow-x-auto" style={{ backgroundColor: '#FFF8F4' }}>
          <div className="container mx-auto px-4 max-w-7xl flex items-center gap-0">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path + item.label} to={item.path} className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors" style={{
                  color: isActive ? '#E8650A' : '#555',
                  borderBottom: isActive ? '2px solid #E8650A' : '2px solid transparent',
                }}>
                  <item.icon className="w-4 h-4" style={{ color: isActive ? '#E8650A' : '#888' }} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white py-3 px-4 space-y-1">
            {NAV_ITEMS.filter(n => n.label).map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <item.icon className="w-4 h-4" /> {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-2 mt-2 flex flex-col gap-2">
              <Link to="/register" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium">
                <Rocket className="w-4 h-4" /> Devenir Fondateur
              </Link>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600">Connexion</Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
