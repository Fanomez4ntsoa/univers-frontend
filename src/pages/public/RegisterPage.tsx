// RegisterPage.tsx — Fidèle à Emergent RegisterPage.jsx
// Plein écran, hors PublicLayout, avec TopBanner + popup vérification

import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Building2, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '../../shared/ui/button'
import { Input } from '../../shared/ui/input'
import { toast } from 'sonner'
import { useRegister } from '../../features/public/hooks/usePublicContent'
import TopBanner from '../../features/public/components/home/TopBanner'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/4450nlnf_abracadabait_logo_transparent.png'

interface FormErrors {
  email?: string
  username?: string
  displayName?: string
  password?: string
  confirmPassword?: string
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const registerMutation = useRegister()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    displayName: '',
    userType: 'particulier' as 'particulier' | 'professionnel',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showVerificationPopup, setShowVerificationPopup] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }
    if (!formData.username) {
      newErrors.username = 'Nom d\'utilisateur requis'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Minimum 3 caractères'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Lettres, chiffres et _ uniquement'
    }
    if (!formData.displayName) {
      newErrors.displayName = 'Nom requis'
    }
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    registerMutation.mutate(
      {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        username: formData.username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
        display_name: formData.displayName,
        user_type: formData.userType,
      },
      {
        onSuccess: () => {
          toast.success('Compte créé ! Connecte-toi maintenant')
          navigate('/login')
        },
        onError: () => toast.error('Erreur lors de l\'inscription — email ou pseudo déjà utilisé'),
      }
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <TopBanner />
      <div className="flex items-center justify-center py-12 px-4" style={{ minHeight: 'calc(100vh - 40px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <img src={LOGO_URL} alt="AbracadaBati" className="h-12 w-auto" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Rejoins la communauté
            </h1>
            <p className="text-gray-600">
              Le premier centre commercial virtuel du bâtiment
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Bandeau Vérification */}
              <div
                className="flex items-center gap-2 p-2.5 rounded-lg"
                style={{
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                }}
              >
                <CheckCircle size={16} style={{ color: '#15803D', flexShrink: 0 }} />
                <p style={{ fontSize: '13px', color: '#15803D', fontWeight: '500', margin: 0 }}>
                  Une personne = Un compte vérifié ·{' '}
                  <button
                    type="button"
                    onClick={() => setShowVerificationPopup(true)}
                    style={{
                      textDecoration: 'underline',
                      color: '#15803D',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                  >
                    En savoir plus
                  </button>
                </p>
              </div>

              {/* User Type */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'particulier' })}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    formData.userType === 'particulier'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className={`mx-auto mb-2 ${
                    formData.userType === 'particulier' ? 'text-blue-600' : 'text-gray-400'
                  }`} size={24} />
                  <span className={`text-sm font-medium ${
                    formData.userType === 'particulier' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    Particulier
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'professionnel' })}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    formData.userType === 'professionnel'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building2 className={`mx-auto mb-2 ${
                    formData.userType === 'professionnel' ? 'text-blue-600' : 'text-gray-400'
                  }`} size={24} />
                  <span className={`text-sm font-medium ${
                    formData.userType === 'professionnel' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    Professionnel
                  </span>
                </button>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="email"
                    placeholder="ton@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                  <Input
                    placeholder="ton_pseudo"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                    className={`pl-8 ${errors.username ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.userType === 'professionnel' ? 'Nom de l\'entreprise' : 'Ton nom'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder={formData.userType === 'professionnel' ? 'Ex: Dupont Plomberie' : 'Ex: Jean Dupont'}
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className={`pl-10 ${errors.displayName ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.displayName && <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer"
              >
                {registerMutation.isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>

          {/* Pro CTA — après la carte */}
          {formData.userType === 'professionnel' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200"
            >
              <p className="text-sm text-orange-800">
                <strong>Artisan ?</strong> Après l'inscription, active ton Espace Pro pour accéder au CRM,
                créer ta boutique et bénéficier d'un assistant dédié.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Popup Vérification d'identité */}
        {showVerificationPopup && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowVerificationPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Publie en toute sécurité</h3>
              </div>

              <p className="text-gray-600 mb-4">
                Chez AbracadaBati, nous garantissons un environnement de confiance grâce à notre processus de vérification d'identité.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Pièce d'identité</p>
                    <p className="text-sm text-gray-500">Carte d'identité ou passeport valide</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Selfie de vérification</p>
                    <p className="text-sm text-gray-500">Pour confirmer que tu es bien le titulaire</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                Tes données sont protégées et ne sont jamais partagées. Processus conforme RGPD.
              </p>

              <Button
                onClick={() => setShowVerificationPopup(false)}
                className="w-full h-11 bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                J'ai compris
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
