import { Check, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'

const plans = [
  {
    name: 'Assistant Mi-Temps', price: '499', period: '/mois', popular: false,
    desc: 'CRM complet + Assistant humain à mi-temps pour t\'aider au quotidien.',
    features: ['CRM bâtiment complet', 'Pipeline commercial & chantier', 'Gestion devis et factures', 'Tous les agents IA inclus', 'Assistant humain 20h/semaine', 'Gestion des emails', 'Rappels et relances', 'Support prioritaire'],
  },
  {
    name: 'Assistant Dédié', price: '949', period: '/mois', popular: true,
    desc: 'La formule complète pour les artisans ambitieux qui veulent se libérer.',
    features: ['Tout Mi-Temps inclus', 'Assistant mi-temps ou plein temps', 'Standard téléphonique IA 24/7', 'Marketing réseaux sociaux', 'Gestion Instagram & Facebook', 'SEO et blog automatisé', 'Assistant administratif complet', 'Reporting mensuel'],
  },
  {
    name: 'Croissance', price: '1499', period: '/mois', popular: false,
    desc: 'Pour développer activement ta clientèle et accélérer ta croissance.',
    features: ['Tout Dédié inclus', 'Deux assistants dédiés', 'Assistant commercial dédié', 'Prospection active LinkedIn', 'Machine à nouveaux clients', 'Qualification de prospects', 'Stratégie SEO avancée', 'Accompagnement croissance'],
  },
]

export default function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-white" id="tarifs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#1E40AF]/10 text-[#1E40AF] text-sm font-medium px-4 py-1.5 rounded-full mb-4">Tarifs transparents</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Choisis ton niveau d'accompagnement</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Trois formules avec assistant humain pour te libérer du temps et développer ton activité. Sans engagement.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`bg-white rounded-xl border-2 p-6 relative ${plan.popular ? 'border-[#F97316] shadow-lg' : 'border-slate-200'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> LE PLUS POPULAIRE
                </div>
              )}
              <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-[#1E40AF]">{plan.price}€</span>
                <span className="text-slate-400">{plan.period}</span>
              </div>
              <p className="text-sm text-slate-600 mb-6">{plan.desc}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-[#F97316]' : 'text-[#10B981]'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <Button className={`w-full h-11 rounded-lg text-white cursor-pointer ${plan.popular ? 'bg-[#F97316] hover:bg-orange-600' : 'bg-[#1E40AF] hover:bg-blue-800'}`}>
                  Commencer
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">Le service démarre 15 jours après le paiement · Sans engagement · Frais de mise en place : 500€</p>
      </div>
    </section>
  )
}
