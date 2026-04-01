import { motion } from 'framer-motion'
import LoginForm from '../../features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-bold text-[#1E40AF]">AbracadaBati</h2>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Connexion
          </h1>
          <p className="text-gray-600">
            Retrouve ton espace professionnel
          </p>
        </div>

        <LoginForm />
      </motion.div>
    </div>
  )
}
