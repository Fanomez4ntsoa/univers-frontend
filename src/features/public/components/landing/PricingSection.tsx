import { Check, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'

const plans = [
  { name: 'Assistant Mi-Temps', price: '499', period: '/mois', popular: false, desc: 'CRM complet + Assistant humain à mi-temps pour t\'aider au quotidien.', features: ['CRM bâtiment complet', 'Pipeline commercial & chantier', 'Gestion devis et factures', 'Tous les agents IA inclus', 'Assistant humain 20h/semaine', 'Gestion des emails', 'Rappels et relances', 'Support prioritaire', 'Formation personnalisée'] },
  { name: 'Assistant Dédié', price: '949', period: '/mois', popular: true, desc: 'La formule complète pour les artisans ambitieux qui veulent se libérer.', features: ['Tout ce qui est dans Mi-Temps', 'Assistant mi-temps ou plein temps', 'Standard téléphonique IA 24/7', 'Marketing réseaux sociaux', 'Gestion Instagram & Facebook', 'SEO et blog automatisé', 'Assistant administratif complet', 'Reporting mensuel'] },
  { name: 'Croissance', price: '1499', period: '/mois', popular: false, desc: 'Pour développer activement ta clientèle et accélérer ta croissance.', features: ['Tout ce qui est dans Dédié', 'Deux assistants dédiés', 'Assistant commercial dédié', 'Prospection active LinkedIn', 'Machine à nouveaux clients', 'Recherche et qualification de prospects', 'SaaS de pilotage commercial', 'Stratégie SEO avancée', 'Accompagnement croissance'] },
]

export default function PricingSection() {
  return (
    <section className="py-12 sm:py-20 bg-slate-50" id="tarifs">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#F97316]/10 text-[#F97316] text-sm font-medium px-4 py-1.5 rounded-full mb-4">Tarifs transparents</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Choisis ton <span className="text-[#F97316]">niveau d&apos;accompagnement</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Trois formules avec assistant humain pour te libérer du temps et développer ton activité. Sans engagement.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div key={plan.name} className={`bg-white rounded-2xl p-6 relative transition-all ${plan.popular ? 'border-2 border-[#F97316] shadow-2xl sm:scale-105' : 'border border-slate-200 shadow-sm'}`}>
              {plan.popular && (<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg"><Star className="w-3 h-3" /> Recommandé</div>)}
              <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>
              <p className="text-sm text-slate-500 mt-1 mb-4">{plan.desc}</p>
              <div className="mb-6"><span className="text-4xl sm:text-5xl font-bold text-slate-800">{plan.price}€</span><span className="text-slate-500">{plan.period}</span></div>
              <ul className="space-y-2 mb-6">{plan.features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm text-slate-600"><Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-[#F97316]' : 'text-[#10B981]'}`} />{f}</li>))}</ul>
              <Link to="/contact"><Button className={`w-full h-11 rounded-lg text-white cursor-pointer ${plan.popular ? 'bg-[#F97316] hover:bg-orange-600' : 'bg-slate-800 hover:bg-slate-900'}`}>Choisir cette formule</Button></Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 space-y-1">
          <p className="text-sm text-slate-500">Le service démarre 15 jours après le paiement · Sans engagement longue durée · Frais de mise en place : 500€</p>
          <p className="text-xs text-slate-400">Tous les forfaits incluent le CRM complet et les agents IA</p>
        </div>
      </div>
    </section>
  )
}
