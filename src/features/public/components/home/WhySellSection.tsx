import { motion } from 'framer-motion'
import { Users, Percent, Gift, Shield } from 'lucide-react'
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
  { icon: Shield, title: 'Artisans certifiés', desc: 'Professionnels vérifiés et qualifiés. Qualité et fiabilité garanties.', color: '#F97316' },
  { icon: Shield, title: 'Paiement sécurisé', desc: 'Paiement via compte séquestre. Sécurité totale jusqu\'à la livraison.', color: '#8B5CF6' },
]

function CardGrid({ badge, badgeColor, title, subtitle, cards }: { badge: string; badgeColor: string; title: string; subtitle: string; cards: Card[] }) {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-6">
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3" style={{ backgroundColor: `${badgeColor}15`, color: badgeColor }}>{badge}</span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${c.color}15` }}>
                <c.icon size={20} style={{ color: c.color }} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h3>
              <p className="text-xs text-gray-500">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhySellSection() {
  return <CardGrid badge="Pour les vendeurs" badgeColor="#10B981" title="Pourquoi vendre sur AbracadaBati ?" subtitle="La plateforme qui change la donne pour les pros du bâtiment" cards={SELLER_CARDS} />
}

export function WhyBuySection() {
  return <CardGrid badge="Pour les acheteurs" badgeColor="#1E40AF" title="Pourquoi acheter sur AbracadaBati ?" subtitle="Une expérience d'achat unique et sécurisée" cards={BUYER_CARDS} />
}
