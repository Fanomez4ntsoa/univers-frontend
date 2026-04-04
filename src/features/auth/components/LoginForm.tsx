// LoginForm.tsx — Fidèle à Emergent ConnexionAcheteurPage.jsx
// Bouton orange, icône LogIn, lien mot de passe oublié

import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import { Input } from '../../../shared/ui/input'
import { toast } from 'sonner'
import { useLogin } from '../hooks/useAuth'
import type { AxiosError } from 'axios'
import { motion } from 'framer-motion'

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const loginMutation = useLogin()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      toast.error('Remplis tous les champs')
      return
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          toast.success(`Bienvenue ${data.profile.display_name} !`)
          navigate('/prospects')
        },
        onError: (err) => {
          const axiosError = err as AxiosError<{ message?: string }>
          const message = axiosError.response?.data?.message || 'Email ou mot de passe incorrect'
          setError(message)
          toast.error(message)
        },
      }
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-700 text-sm"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse email
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              className="pl-10 rounded-xl"
              required
            />
          </div>
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10 rounded-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Mot de passe oublié */}
        <div className="text-right">
          <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
            Mot de passe oublié ?
          </a>
        </div>

        {/* Bouton connexion */}
        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl h-12 text-base font-semibold cursor-pointer"
        >
          {loginMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn size={18} className="mr-2" />
              Se connecter
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
