import { Check, Star } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import { useCreateCheckout } from '../hooks/useSubscription'
import { PLAN_CONFIG } from '../types/subscription'
import type { PlanSlug } from '../types/subscription'

const FEATURES = [
  'CRM complet (prospects, clients, devis, factures)',
  'Gestion des chantiers + rentabilité',
  'Portail client avec signature électronique',
  'Boutique en ligne + produits',
  'Petites annonces illimitées',
  'Matching avec des particuliers',
  'Profil artisan vérifié',
  'Support prioritaire',
]

export default function PricingCards() {
  const checkoutMutation = useCreateCheckout()

  const handleSubscribe = (plan: PlanSlug) => {
    checkoutMutation.mutate(plan)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {(Object.entries(PLAN_CONFIG) as [PlanSlug, typeof PLAN_CONFIG[PlanSlug]][]).map(([slug, plan]) => {
        const isYearly = slug === 'pro_yearly'
        return (
          <div key={slug} className={`bg-white rounded-xl border-2 p-6 relative ${isYearly ? 'border-[#F97316] shadow-lg' : 'border-slate-200'}`}>
            {isYearly && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" /> RECOMMANDÉ
              </div>
            )}
            {plan.badge && (
              <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">{plan.badge}</span>
            )}
            <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
            <div className="mt-2 mb-6">
              <span className="text-4xl font-bold text-[#1E40AF]">{plan.price}€</span>
              <span className="text-slate-400">{plan.period}</span>
              {isYearly && <p className="text-sm text-slate-500 mt-1">soit 39€/mois au lieu de 49€</p>}
            </div>
            <ul className="space-y-3 mb-6">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isYearly ? 'text-[#F97316]' : 'text-[#10B981]'}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => handleSubscribe(slug)}
              disabled={checkoutMutation.isPending}
              className={`w-full h-11 rounded-lg text-white cursor-pointer ${isYearly ? 'bg-[#F97316] hover:bg-orange-600' : 'bg-[#1E40AF] hover:bg-blue-800'}`}
            >
              {checkoutMutation.isPending ? 'Redirection...' : "S'abonner"}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
