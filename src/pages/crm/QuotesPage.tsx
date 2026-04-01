import { useState } from 'react'
import { useQuotes } from '../../features/crm/quotes/hooks/useQuotes'
import QuotesList from '../../features/crm/quotes/components/QuotesList'
import QuoteDetail from '../../features/crm/quotes/components/QuoteDetail'
import PageSkeleton from '../../shared/components/PageSkeleton'
import { toast } from 'sonner'
import { useSendQuote, useDeleteQuote, useDuplicateQuote, useConvertToInvoice } from '../../features/crm/quotes/hooks/useQuotes'

export default function QuotesPage() {
  const { data, isLoading, isError } = useQuotes()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const sendMutation = useSendQuote()
  const deleteMutation = useDeleteQuote()
  const duplicateMutation = useDuplicateQuote()
  const convertMutation = useConvertToInvoice()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur lors du chargement des devis</p></div>

  if (selectedId) {
    return (
      <QuoteDetail
        quoteId={selectedId}
        onBack={() => setSelectedId(null)}
        onEdit={() => setSelectedId(null)}
        onSend={(id) => sendMutation.mutate(id, { onSuccess: () => toast.success('Devis envoyé') })}
        onSign={() => setSelectedId(null)}
        onDuplicate={(id) => duplicateMutation.mutate(id, { onSuccess: () => { toast.success('Devis dupliqué'); setSelectedId(null) } })}
        onConvertInvoice={(id) => convertMutation.mutate(id, { onSuccess: () => { toast.success('Facture créée'); setSelectedId(null) } })}
        onDelete={(id) => { if (confirm('Supprimer ?')) deleteMutation.mutate(id, { onSuccess: () => { toast.success('Supprimé'); setSelectedId(null) } }) }}
      />
    )
  }

  return <QuotesList data={data ?? []} onSelectQuote={(q) => setSelectedId(q.id)} />
}
