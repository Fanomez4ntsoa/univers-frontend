import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, User, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../../../../shared/ui/button'
import { useRegister } from '../../hooks/usePublicContent'
import VerificationBanner from './VerificationBanner'
import UserTypeToggle from './UserTypeToggle'
import FormField from './FormField'
import PasswordField from './PasswordField'
import ProCTA from './ProCTA'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_organize-smart/artifacts/4450nlnf_abracadabait_logo_transparent.png'

interface FormErrors {
  email?: string
  username?: string
  displayName?: string
  password?: string
  confirmPassword?: string
}

export default function RegisterForm() {
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
          <VerificationBanner />

          <UserTypeToggle
            value={formData.userType}
            onChange={(userType) => setFormData({ ...formData, userType })}
          />

          <FormField
            label="Email"
            type="email"
            placeholder="ton@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            icon={<Mail size={18} />}
            error={errors.email}
          />

          <FormField
            label="Nom d'utilisateur"
            placeholder="ton_pseudo"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
            prefix="@"
            error={errors.username}
          />

          <FormField
            label={formData.userType === 'professionnel' ? 'Nom de l\'entreprise' : 'Ton nom'}
            placeholder={formData.userType === 'professionnel' ? 'Ex: Dupont Plomberie' : 'Ex: Jean Dupont'}
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            icon={<User size={18} />}
            error={errors.displayName}
          />

          <PasswordField
            label="Mot de passe"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            showPassword={showPassword}
            onToggleShow={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          <PasswordField
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            showPassword={showPassword}
            error={errors.confirmPassword}
          />

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

      {/* Pro CTA */}
      {formData.userType === 'professionnel' && <ProCTA />}
    </motion.div>
  )
}
