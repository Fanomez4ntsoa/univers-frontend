import { Link } from 'react-router-dom'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/4450nlnf_abracadabait_logo_transparent.png'

const footerColumns = {
  'Navigation': [
    { label: 'Artisans', path: '/artisans' },
    { label: 'Marketplace', path: '/produits' },
    { label: 'Petites annonces', path: '/listings' },
    { label: 'Emploi', path: '/jobs' },
    { label: 'Réseau social', path: '/feed' },
  ],
  'Pour les Pros': [
    { label: 'Programme Fondateur', path: '/register' },
    { label: 'Espace Pro', path: '/login' },
    { label: 'Réseau Pros', path: '/discover' },
    { label: 'Décrire un projet', path: '/contact' },
  ],
  'Informations': [
    { label: 'À propos', path: '/a-propos' },
    { label: 'Tarifs', path: '/tarifs' },
    { label: 'Contact', path: '/contact' },
    { label: 'Mentions légales', path: '#' },
    { label: 'CGV', path: '#' },
    { label: 'Confidentialité', path: '#' },
  ],
}

export default function PublicFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo + description */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src={LOGO_URL} alt="AbracadaBati" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-gray-500 mb-3">Le centre commercial virtuel du bâtiment. Sans commission, sans intermédiaire.</p>
            <span className="inline-block text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">Version BETA - Test</span>
          </div>

          {/* Columns */}
          {Object.entries(footerColumns).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-gray-900 text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-gray-600 hover:text-[#1E40AF] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Beta warning */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
          AbracadaBati est actuellement en version Beta. Aucune transaction réelle n'est possible pour le moment. Les fonctionnalités de paiement et de vente seront activées lors de l'ouverture officielle prévue le 1er Juillet 2026.
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© 2025-2026 AbracadaBati. Tous droits réservés.</p>
          <p className="text-xs text-gray-400 mt-1">Site en version Beta - Aucune transaction disponible</p>
        </div>
      </div>
    </footer>
  )
}
