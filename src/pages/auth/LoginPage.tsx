// LoginPage.tsx — Fidèle à Emergent ConnexionAcheteurPage.jsx
// Background gradient orange, logo image, lien retour, lien inscription

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LoginForm from '../../features/auth/components/LoginForm'
import TopBanner from '../../features/public/components/home/TopBanner'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/4450nlnf_abracadabait_logo_transparent.png'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <TopBanner />
      <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 40px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Retour */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>

        {/* Logo et titre */}
        <div className="text-center mb-8">
          <img
            src={LOGO_URL}
            alt="AbracadaBati"
            className="h-14 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
          <p className="text-gray-500 mt-1">Accède à ton espace professionnel</p>
        </div>

        {/* Formulaire */}
        <LoginForm />

        {/* Séparateur */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Inscription */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-orange-600 hover:text-orange-700 font-medium">
              Créer un compte
            </Link>
          </p>
        </div>

        {/* Note de test */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Compte de test :</strong><br />
            Email: <code className="bg-blue-100 px-1 rounded">artisan@test.com</code><br />
            Mot de passe: <code className="bg-blue-100 px-1 rounded">password123</code>
          </p>
        </div>
      </motion.div>
      </div>
    </div>
  )
}
