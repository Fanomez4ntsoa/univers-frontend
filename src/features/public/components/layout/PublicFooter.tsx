// PublicFooter.tsx — Fidèle à Emergent HomePage.jsx lignes 1818-1910
// Footer dark bg-slate-900 avec badge Beta + bottom bar

import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/4450nlnf_abracadabait_logo_transparent.png'

export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src={LOGO_URL}
                alt="AbracadaBati"
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 text-sm mb-4">
              Le centre commercial virtuel du bâtiment. Sans commission, sans intermédiaire.
            </p>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium">
              <Sparkles size={12} />
              Version BETA - Test
            </span>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/artisans" className="text-slate-400 hover:text-white text-sm transition-colors">Artisans</Link></li>
              <li><Link to="/shops" className="text-slate-400 hover:text-white text-sm transition-colors">Marketplace</Link></li>
              <li><Link to="/listings" className="text-slate-400 hover:text-white text-sm transition-colors">Petites annonces</Link></li>
              <li><Link to="/jobs" className="text-slate-400 hover:text-white text-sm transition-colors">Emploi</Link></li>
              <li><Link to="/feed" className="text-slate-400 hover:text-white text-sm transition-colors">Réseau social</Link></li>
            </ul>
          </div>

          {/* Pour les Pros */}
          <div>
            <h4 className="font-semibold text-white mb-4">Pour les Pros</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-slate-400 hover:text-white text-sm transition-colors">Programme Fondateur</Link></li>
              <li><Link to="/login" className="text-slate-400 hover:text-white text-sm transition-colors">Espace Pro</Link></li>
              <li><Link to="/discover" className="text-slate-400 hover:text-white text-sm transition-colors">Réseau Pros</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Décrire un projet</Link></li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-semibold text-white mb-4">Informations</h4>
            <ul className="space-y-2">
              <li><Link to="/mentions-legales" className="text-slate-400 hover:text-white text-sm transition-colors">Mentions légales</Link></li>
              <li><Link to="/cgv" className="text-slate-400 hover:text-white text-sm transition-colors">CGV</Link></li>
              <li><Link to="/cgu" className="text-slate-400 hover:text-white text-sm transition-colors">CGU</Link></li>
              <li><Link to="/confidentialite" className="text-slate-400 hover:text-white text-sm transition-colors">Confidentialité</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Avertissement Beta */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          {/* Avertissement Beta */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles size={16} className="text-amber-400" />
              </div>
              <div>
                <p className="text-amber-400 font-semibold text-sm mb-1">Version BETA - Test</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  AbracadaBati est actuellement en version Beta. <strong className="text-amber-300">Aucune transaction réelle n'est possible pour le moment.</strong> Les fonctionnalités de paiement et de vente seront activées lors de l'ouverture officielle prévue le 1er Juillet 2026.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-slate-500 text-xs">
              © 2025-2026 AbracadaBati. Tous droits réservés.
            </p>
            <p className="text-slate-500 text-xs">
              Site en version Beta - Aucune transaction disponible
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
