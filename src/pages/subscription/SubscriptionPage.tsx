import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import { useSubscriptionStatus } from '../../features/subscription/hooks/useSubscription'
import SubscriptionStatusCard from '../../features/subscription/components/SubscriptionStatus'
import PricingCards from '../../features/subscription/components/PricingCards'
import CancelModal from '../../features/subscription/components/CancelModal'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function SubscriptionPage() {
  const { data, isLoading, isError } = useSubscriptionStatus()
  const [cancelOpen, setCancelOpen] = useState(false)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('success') === 'true') toast.success('Abonnement activé avec succès !')
    if (searchParams.get('cancelled') === 'true') toast.info('Paiement annulé')
  }, [searchParams])

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur</p></div>

  const isSubscribed = data && data.status === 'active'

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CreditCard className="w-6 h-6 text-[#1E40AF]" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Abonnement Pro</h1>
          <p className="text-slate-500 text-sm">{isSubscribed ? 'Gère ton abonnement' : 'Passe au Pro pour débloquer toutes les fonctionnalités'}</p>
        </div>
      </div>

      {isSubscribed ? (
        <SubscriptionStatusCard subscription={data} onCancel={() => setCancelOpen(true)} />
      ) : (
        <PricingCards />
      )}

      <CancelModal open={cancelOpen} onClose={() => setCancelOpen(false)} />
    </div>
  )
}
