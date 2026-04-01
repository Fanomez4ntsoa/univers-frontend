import { useState } from 'react'
import { Plus, Receipt } from 'lucide-react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../../../shared/ui/table'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import type { Invoice } from '../../../../shared/types/crm'
import { useDeleteInvoice, useSendInvoice, useCancelInvoice } from '../hooks/useInvoices'
import InvoiceCard from './InvoiceCard'
import InvoiceForm from './InvoiceForm'
import InvoiceFilters from './InvoiceFilters'
import MarkPaidModal from './MarkPaidModal'

interface InvoicesListProps {
  data: Invoice[]
  onSelectInvoice: (inv: Invoice) => void
}

export default function InvoicesList({ data, onSelectInvoice }: InvoicesListProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [markPaidInvoice, setMarkPaidInvoice] = useState<Invoice | null>(null)

  const deleteMutation = useDeleteInvoice()
  const sendMutation = useSendInvoice()
  const cancelMutation = useCancelInvoice()

  const filtered = data.filter((inv) => {
    const q = search.toLowerCase()
    const matchesSearch = inv.invoice_number.toLowerCase().includes(q) || inv.client?.name?.toLowerCase().includes(q)
    const matchesStatus = !statusFilter || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreate = () => { setEditingInvoice(null); setFormOpen(true) }
  const handleEdit = (inv: Invoice) => { setEditingInvoice(inv); setFormOpen(true) }
  const handleDelete = (id: number) => {
    if (!confirm('Supprimer cette facture ?')) return
    deleteMutation.mutate(id, { onSuccess: () => toast.success('Facture supprimée'), onError: () => toast.error('Erreur') })
  }
  const handleSend = (id: number) => {
    sendMutation.mutate(id, { onSuccess: () => toast.success('Facture envoyée'), onError: () => toast.error('Erreur') })
  }
  const handleCancel = (id: number) => {
    if (!confirm('Annuler cette facture ?')) return
    cancelMutation.mutate(id, { onSuccess: () => toast.success('Facture annulée'), onError: () => toast.error('Erreur') })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Factures</h1>
          <p className="text-slate-500 text-sm">Gère tes factures et paiements</p>
        </div>
        <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
          <Plus className="w-5 h-5 mr-2" /> Nouvelle facture
        </Button>
      </div>

      <InvoiceFilters search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusChange={setStatusFilter} />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Receipt className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">Aucune facture trouvée</p>
            <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-2" /> Créer une facture
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant TTC</TableHead>
                <TableHead>Payé</TableHead>
                <TableHead>Reste dû</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => (
                <InvoiceCard
                  key={inv.id} invoice={inv}
                  onSelect={onSelectInvoice} onEdit={handleEdit} onDelete={handleDelete}
                  onSend={handleSend} onMarkPaid={setMarkPaidInvoice} onCancel={handleCancel}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <InvoiceForm open={formOpen} onClose={() => setFormOpen(false)} invoice={editingInvoice} />
      {markPaidInvoice && (
        <MarkPaidModal open={!!markPaidInvoice} onClose={() => setMarkPaidInvoice(null)} invoiceId={markPaidInvoice.id} total={markPaidInvoice.total} />
      )}
    </div>
  )
}
