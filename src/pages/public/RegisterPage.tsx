import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Building, UserPlus } from 'lucide-react'
import { Button } from '../../shared/ui/button'
import { Input } from '../../shared/ui/input'
import { toast } from 'sonner'
import { useRegister } from '../../features/public/hooks/usePublicContent'

export default function RegisterPage() {
  const navigate = useNavigate()
  const registerMutation = useRegister()
  const [userType, setUserType] = useState<'particulier' | 'professionnel'>('particulier')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !username || !displayName || !password) { toast.error('Remplis tous les champs obligatoires'); return }
    if (username.length < 3) { toast.error('Nom d\'utilisateur : minimum 3 caractères'); return }
    if (password.length < 6) { toast.error('Mot de passe : minimum 6 caractères'); return }
    if (password !== confirmPassword) { toast.error('Les mots de passe ne correspondent pas'); return }

    registerMutation.mutate(
      { email, password, password_confirmation: confirmPassword, username: username.toLowerCase().replace(/[^a-z0-9_]/g, ''), display_name: displayName, user_type: userType },
      {
        onSuccess: () => { toast.success('Compte créé ! Connecte-toi maintenant'); navigate('/login') },
        onError: () => toast.error('Erreur lors de l\'inscription — email ou pseudo déjà utilisé'),
      }
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Rejoins la communauté</h1>
          <p className="text-slate-600">Le premier centre commercial virtuel du bâtiment</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center text-sm text-green-700 mb-6">
          Une personne = Un compte vérifié
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* User type toggle */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            <button onClick={() => setUserType('particulier')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${userType === 'particulier' ? 'bg-white text-[#1E40AF] shadow-sm' : 'text-slate-500'}`}>
              <User className="w-4 h-4" /> Particulier
            </button>
            <button onClick={() => setUserType('professionnel')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${userType === 'professionnel' ? 'bg-white text-[#1E40AF] shadow-sm' : 'text-slate-500'}`}>
              <Building className="w-4 h-4" /> Professionnel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ton@email.com" className="pl-10 h-11 rounded-xl" /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom d'utilisateur</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">@</span><Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ton_pseudo" className="pl-8 h-11 rounded-xl" /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{userType === 'professionnel' ? 'Nom de l\'entreprise' : 'Ton nom'}</label>
              <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={userType === 'professionnel' ? 'Ex: Dupont Plomberie' : 'Ex: Jean Dupont'} className="pl-10 h-11 rounded-xl" /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 pr-10 h-11 rounded-xl" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirmer le mot de passe</label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="pl-10 h-11 rounded-xl" /></div>
            </div>
            <Button type="submit" disabled={registerMutation.isPending} className="w-full h-11 bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              {registerMutation.isPending ? 'Création...' : <><UserPlus className="w-4 h-4 mr-2" /> Créer mon compte</>}
            </Button>
          </form>

          {userType === 'professionnel' && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm text-orange-700 mt-4">
              Artisan ? Après l'inscription, active ton Espace Pro pour accéder au CRM, créer ta boutique et bénéficier d'un assistant dédié.
            </div>
          )}

          <p className="text-center text-sm text-slate-600 mt-6">
            Déjà un compte ?{' '}<Link to="/login" className="text-[#1E40AF] hover:underline font-medium">Se connecter</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
