// ArtisansCTASection.tsx — Fidèle à Emergent ArtisansPage.jsx CTA section

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function ArtisansCTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Tu es artisan ?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Rejoins notre réseau et développe ton activité
          </p>
          <Link to="/register">
            <button
              className="h-14 px-8 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              Créer ma boutique gratuitement
              <ChevronRight size={22} />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
