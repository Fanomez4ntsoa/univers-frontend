import { CreditCard, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import { useCustomerPortal } from '../hooks/useSubscription'
import { PLAN_CONFIG, STATUS_LABELS } from '../types/subscription'
import type { Subscription } from '../types/subscription'
import { formatDate } from '../../../shared/lib/utils'

interface SubscriptionStatusProps {
  subscription: Subscription
  onCancel: () => void
}

export default function SubscriptionStatusCard({ subscription, onCancel }: SubscriptionStatusProps) {
  const portalMutation = useCustomerPortal()
  const plan = PLAN_CONFIG[subscription.plan]
  const statusLabel = STATUS_LABELS[subscription.status]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#1E40AF]/10 rounded-xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-[#1E40AF]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{plan.name}</h2>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusLabel.color}`}>{statusLabel.label}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#1E40AF]">{plan.price}€<span className="text-sm font-normal text-slate-400">{plan.period}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>Début : {formatDate(subscription.current_period_start)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>Fin : {formatDate(subscription.current_period_end)}</span>
        </div>
      </div>

      {subscription.cancel_at_period_end && (
        <div className="bg-amber-50 rounded-lg p-3 text-sm text-amber-700">
          Ton abonnement sera annulé à la fin de la période en cours.
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button onClick={() => portalMutation.mutate()} disabled={portalMutation.isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer flex-1">
          <ExternalLink className="w-4 h-4 mr-2" /> {portalMutation.isPending ? 'Redirection...' : 'Gérer mon abonnement'}
        </Button>
        {subscription.status === 'active' && !subscription.cancel_at_period_end && (
          <Button variant="outline" onClick={onCancel} className="rounded-lg text-red-500 hover:text-red-600">
            Annuler
          </Button>
        )}
      </div>
    </div>
  )
}
