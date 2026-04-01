import { useState } from 'react'
import { Plus, FileText } from 'lucide-react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../../../shared/ui/table'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import type { Quote } from '../../../../shared/types/crm'
import { useDeleteQuote, useSendQuote, useDuplicateQuote, useConvertToInvoice } from '../hooks/useQuotes'
import QuoteCard from './QuoteCard'
import QuoteForm from './QuoteForm'
import QuoteFilters from './QuoteFilters'
import SignatureModal from './SignatureModal'

interface QuotesListProps {
  data: Quote[]
  onSelectQuote: (q: Quote) => void
}

export default function QuotesList({ data, onSelectQuote }: QuotesListProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null)
  const [signingQuote, setSigningQuote] = useState<Quote | null>(null)

  const deleteMutation = useDeleteQuote()
  const sendMutation = useSendQuote()
  const duplicateMutation = useDuplicateQuote()
  const convertMutation = useConvertToInvoice()

  const filtered = data.filter((q) => {
    const matchesSearch = q.quote_number.toLowerCase().includes(search.toLowerCase()) ||
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.client?.name?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || q.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreate = () => { setEditingQuote(null); setFormOpen(true) }
  const handleEdit = (q: Quote) => { setEditingQuote(q); setFormOpen(true) }
  const handleDelete = (id: number) => {
    if (!confirm('Supprimer ce devis ?')) return
    deleteMutation.mutate(id, { onSuccess: () => toast.success('Devis supprimé'), onError: () => toast.error('Erreur') })
  }
  const handleSend = (id: number) => {
    sendMutation.mutate(id, { onSuccess: () => toast.success('Devis envoyé'), onError: () => toast.error('Erreur') })
  }
  const handleDuplicate = (id: number) => {
    duplicateMutation.mutate(id, { onSuccess: () => toast.success('Devis dupliqué'), onError: () => toast.error('Erreur') })
  }
  const handleConvertInvoice = (id: number) => {
    if (!confirm('Convertir ce devis en facture ?')) return
    convertMutation.mutate(id, { onSuccess: () => toast.success('Facture créée'), onError: () => toast.error('Erreur') })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Devis</h1>
          <p className="text-slate-500 text-sm">Gère tes devis et propositions commerciales</p>
        </div>
        <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
          <Plus className="w-5 h-5 mr-2" /> Nouveau devis
        </Button>
      </div>

      <QuoteFilters search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusChange={setStatusFilter} />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">Aucun devis trouvé</p>
            <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-2" /> Créer un devis
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Montant TTC</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Validité</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((q) => (
                <QuoteCard
                  key={q.id} quote={q}
                  onSelect={onSelectQuote} onEdit={handleEdit} onDelete={handleDelete}
                  onSend={handleSend} onSign={setSigningQuote} onDuplicate={handleDuplicate}
                  onConvertInvoice={handleConvertInvoice}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <QuoteForm open={formOpen} onClose={() => setFormOpen(false)} quote={editingQuote} />
      {signingQuote && (
        <SignatureModal open={!!signingQuote} onClose={() => setSigningQuote(null)} quoteId={signingQuote.id} />
      )}
    </div>
  )
}
