import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, LogIn, UserPlus } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import { getStoredProfile } from '../../auth/hooks/useAuth'

const navLinks = [
  { label: 'Artisans', path: '/discover' },
  { label: 'Marketplace', path: '/shops' },
  { label: 'Réseau', path: '/feed' },
  { label: 'Emploi', path: '/jobs' },
  { label: 'Tarifs', path: '/tarifs' },
]

const footerLinks = {
  'À propos': [
    { label: 'Qui sommes-nous', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
    { label: 'Tarifs', path: '/tarifs' },
  ],
  'Services': [
    { label: 'Trouver un artisan', path: '/discover' },
    { label: 'Marketplace', path: '/shops' },
    { label: 'Offres d\'emploi', path: '/jobs' },
  ],
  'Professionnels': [
    { label: 'Espace Pro', path: '/login' },
    { label: 'Annonces', path: '/listings' },
    { label: 'Réseau', path: '/feed' },
  ],
  'Légal': [
    { label: 'Mentions légales', path: '#' },
    { label: 'CGV', path: '#' },
    { label: 'Confidentialité', path: '#' },
  ],
}

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const profile = getStoredProfile()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/icons/icon.svg" alt="AbracadaBati" className="h-8 w-8" />
              <span className="text-xl font-bold text-[#1E40AF]">AbracadaBati</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-[#1E40AF]' : 'text-slate-600 hover:text-[#1E40AF]'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {profile ? (
                <Link to="/prospects">
                  <Button variant="outline" size="sm" className="rounded-lg">Mon espace</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login"><Button variant="ghost" size="sm"><LogIn className="w-4 h-4 mr-1" /> Connexion</Button></Link>
                  <Link to="/register"><Button size="sm" className="bg-[#F97316] hover:bg-orange-600 text-white rounded-lg"><UserPlus className="w-4 h-4 mr-1" /> S'inscrire</Button></Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-slate-100 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2 px-3">
                <Link to="/login" className="flex-1"><Button variant="outline" className="w-full rounded-lg">Connexion</Button></Link>
                <Link to="/register" className="flex-1"><Button className="w-full bg-[#F97316] hover:bg-orange-600 text-white rounded-lg">S'inscrire</Button></Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main><Outlet /></main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-sm mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}><Link to={link.path} className="text-sm text-slate-400 hover:text-white transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} AbracadaBati. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
