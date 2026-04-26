import { motion } from 'framer-motion'

export default function ProCTA() {
  return (
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
  )
}
