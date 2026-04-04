import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Rocket, Crown } from 'lucide-react'

export default function FounderCTASection() {
  return (
    <section className="sm:hidden py-10 px-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#F97316]/20 rounded-full filter blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-4 sm:mb-6">
            <Rocket size={16} />
            Programme Fondateur 2025-2026
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Tu es artisan ?
            <span className="block text-emerald-400 mt-1 sm:mt-2">Rejoins les fondateurs</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mb-6 sm:mb-8 px-4">
            Profite de <span className="text-white font-semibold">1 an offert</span> et participe à la construction
            de la première plateforme 100% dédiée aux pros du bâtiment
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/pricing">
              <button className="h-12 sm:h-14 px-6 sm:px-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 w-full sm:w-auto transition-colors">
                <Crown size={20} />
                Devenir Fondateur
              </button>
            </Link>
            <Link to="/about">
              <button className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl font-semibold w-full sm:w-auto transition-colors">
                En savoir plus
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
