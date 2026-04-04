// NewsletterSection.tsx — Fidèle à Emergent HomePage.jsx lignes 1780-1816
// Gradient pleine largeur sur la section, pas une card arrondie

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  return (
    <section className="py-10 sm:py-16 px-4 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-white/20 flex items-center justify-center">
            <Mail size={28} className="text-white sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
            Reste informé
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8">
            Reçois les dernières actualités, offres exclusives et conseils du bâtiment
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ton adresse email"
              className="flex-1 h-12 sm:h-14 px-5 bg-white rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="h-12 sm:h-14 px-6 sm:px-8 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-semibold transition-colors">
              S'inscrire
            </button>
          </form>

          <p className="text-white/60 text-xs mt-4">
            Pas de spam, désabonnement en un clic
          </p>
        </motion.div>
      </div>
    </section>
  )
}
