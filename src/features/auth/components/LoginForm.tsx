import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import { Input } from '../../../shared/ui/input'
import { toast } from 'sonner'
import { useLogin } from '../hooks/useAuth'
import type { AxiosError } from 'axios'

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const loginMutation = useLogin()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

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
        onError: (error) => {
          const axiosError = error as AxiosError<{ message?: string }>
          const message = axiosError.response?.data?.message || 'Email ou mot de passe incorrect'
          toast.error(message)
        },
      }
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-11 rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full h-11 bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer"
        >
          {loginMutation.isPending ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <>
              Se connecter
              <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
