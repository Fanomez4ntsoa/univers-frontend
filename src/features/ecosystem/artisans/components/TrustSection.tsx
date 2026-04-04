// TrustSection.tsx — Fidèle à Emergent ArtisansPage.jsx Trust Section

import { motion } from 'framer-motion'
import { CheckCircle, Star, Shield } from 'lucide-react'

const TRUST_ITEMS = [
  { icon: CheckCircle, title: 'Artisans vérifiés', desc: 'Tous nos professionnels sont vérifiés et qualifiés', color: '#10B981' },
  { icon: Star, title: 'Avis clients réels', desc: 'Consulte les retours d\'expérience de nos clients', color: '#F59E0B' },
  { icon: Shield, title: 'Devis gratuits', desc: 'Reçois jusqu\'à 5 devis gratuits en 24h', color: '#1E40AF' },
]

export default function TrustSection() {
  return (
    <section className="bg-white py-16 mt-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Pourquoi choisir AbracadaBati ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon size={28} style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
