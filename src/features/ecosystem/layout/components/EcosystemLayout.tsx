import { Link, Outlet, useLocation } from 'react-router-dom'
import { Rss, Compass, Store, ShoppingBag, Briefcase, LogIn } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { getStoredProfile } from '../../../auth/hooks/useAuth'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  icon: LucideIcon
  label: string
  path: string
}

const navItems: NavItem[] = [
  { icon: Rss, label: 'Feed', path: '/feed' },
  { icon: Compass, label: 'Découvrir', path: '/discover' },
  { icon: Store, label: 'Boutiques', path: '/shops' },
  { icon: ShoppingBag, label: 'Annonces', path: '/listings' },
  { icon: Briefcase, label: 'Emplois', path: '/jobs' },
]

export default function EcosystemLayout() {
  const location = useLocation()
  const profile = getStoredProfile()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#1E40AF] text-white sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-14">
            <Link to="/feed" className="text-xl font-bold">AbracadaBati</Link>
            <div className="flex items-center gap-3">
              {profile ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-semibold">{profile.display_name?.charAt(0).toUpperCase() ?? '?'}</span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{profile.display_name}</span>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="secondary" size="sm" className="bg-[#F97316] hover:bg-orange-600 text-white rounded-lg cursor-pointer">
                    <LogIn className="w-4 h-4 mr-1" /> Connexion
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-1 overflow-x-auto pb-1 -mb-px">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-white text-[#1E40AF]'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
        <Outlet />
      </main>
    </div>
  )
}
