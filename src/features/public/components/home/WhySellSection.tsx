// WhySellSection.tsx + WhyBuySection.tsx — Fidèles à Emergent HomePage.jsx
// Deux sections séparées car hover borders différents

import { motion } from 'framer-motion'
import { Users, Percent, Gift, Shield, Store, ShoppingCart, BadgeCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Card { icon: LucideIcon; title: string; desc: string; color: string }

const SELLER_CARDS: Card[] = [
  { icon: Users, title: 'Vendre sans intermédiaire', desc: 'Vente directe entre professionnels et clients. Aucun tiers, aucune plateforme intrusive.', color: '#10B981' },
  { icon: Percent, title: '0% de commission', desc: 'Contrairement aux plateformes classiques (~15%). Aucun frais sur les ventes.', color: '#1E40AF' },
  { icon: Gift, title: 'Outils gratuits & CRM', desc: 'CRM complet (devis, factures, suivi client). Gestion commerciale incluse gratuitement.', color: '#F97316' },
  { icon: Shield, title: 'Encaissement sécurisé', desc: 'Paiements sécurisés via compte séquestre. Garantie d\'être payé.', color: '#8B5CF6' },
]

const BUYER_CARDS: Card[] = [
  { icon: Users, title: 'Achat sans intermédiaire', desc: 'Achat direct auprès des vendeurs. Prix plus justes, sans surcoût.', color: '#1E40AF' },
  { icon: Percent, title: '0% de commission', desc: 'Contrairement aux plateformes classiques (~15%). Pas de surcoût caché.', color: '#10B981' },
  { icon: BadgeCheck, title: 'Artisans certifiés', desc: 'Professionnels vérifiés et qualifiés. Qualité et fiabilité garanties.', color: '#F97316' },
  { icon: Shield, title: 'Paiement sécurisé', desc: 'Paiement via compte séquestre. Sécurité totale jusqu\'à la livraison.', color: '#8B5CF6' },
]

export function WhySellSection() {
  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 rounded-full text-emerald-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Store size={14} className="sm:w-4 sm:h-4" />
            Pour les vendeurs
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Pourquoi vendre sur AbracadaBati ?
          </h2>
          <p className="text-sm sm:text-base text-gray-600">La plateforme qui change la donne pour les pros du bâtiment</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {SELLER_CARDS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all group"
            >
              <div
                className="w-10 h-10 sm:w-14 sm:h-14 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon size={20} className="sm:w-7 sm:h-7" style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h3>
              <p className="text-[11px] sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyBuySection() {
  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
            Pour les acheteurs
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Pourquoi acheter sur AbracadaBati ?
          </h2>
          <p className="text-sm sm:text-base text-gray-600">Une expérience d'achat unique et sécurisée</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {BUYER_CARDS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all group"
            >
              <div
                className="w-10 h-10 sm:w-14 sm:h-14 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon size={20} className="sm:w-7 sm:h-7" style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h3>
              <p className="text-[11px] sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
