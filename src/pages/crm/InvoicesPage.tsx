import { useState } from 'react'
import { useInvoices, useSendInvoice, useDeleteInvoice, useCancelInvoice } from '../../features/crm/invoices/hooks/useInvoices'
import InvoicesList from '../../features/crm/invoices/components/InvoicesList'
import InvoiceDetail from '../../features/crm/invoices/components/InvoiceDetail'
import PageSkeleton from '../../shared/components/PageSkeleton'
import type { Invoice } from '../../shared/types/crm'
import { toast } from 'sonner'

export default function InvoicesPage() {
  const { data, isLoading, isError } = useInvoices()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const sendMutation = useSendInvoice()
  const deleteMutation = useDeleteInvoice()
  const cancelMutation = useCancelInvoice()

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur lors du chargement des factures</p></div>

  if (selectedId) {
    return (
      <InvoiceDetail
        invoiceId={selectedId}
        onBack={() => setSelectedId(null)}
        onEdit={() => setSelectedId(null)}
        onSend={(id) => sendMutation.mutate(id, { onSuccess: () => toast.success('Facture envoyée') })}
        onMarkPaid={() => setSelectedId(null)}
        onCancel={(id) => { if (confirm('Annuler ?')) cancelMutation.mutate(id, { onSuccess: () => { toast.success('Annulée'); setSelectedId(null) } }) }}
        onDelete={(id) => { if (confirm('Supprimer ?')) deleteMutation.mutate(id, { onSuccess: () => { toast.success('Supprimée'); setSelectedId(null) } }) }}
      />
    )
  }

  return <InvoicesList data={data ?? []} onSelectInvoice={(inv: Invoice) => setSelectedId(inv.id)} />
}
