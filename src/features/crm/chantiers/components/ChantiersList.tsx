import { useState } from 'react'
import { Plus, HardHat } from 'lucide-react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../../../shared/ui/table'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import type { Chantier } from '../../../../shared/types/crm'
import { useDeleteChantier } from '../hooks/useChantiers'
import ChantierCard from './ChantierCard'
import ChantierForm from './ChantierForm'
import ChantierFilters from './ChantierFilters'

interface ChantiersListProps {
  data: Chantier[]
  onSelectChantier: (c: Chantier) => void
}

export default function ChantiersList({ data, onSelectChantier }: ChantiersListProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingChantier, setEditingChantier] = useState<Chantier | null>(null)

  const deleteMutation = useDeleteChantier()

  const filtered = data.filter((c) => {
    const q = search.toLowerCase()
    const matchesSearch = c.client_name.toLowerCase().includes(q) || c.city?.toLowerCase().includes(q)
    const matchesStatus = !statusFilter || c.status === statusFilter
    const matchesType = !typeFilter || c.chantier_type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleEdit = (c: Chantier) => { setEditingChantier(c); setFormOpen(true) }
  const handleCreate = () => { setEditingChantier(null); setFormOpen(true) }
  const handleDelete = (id: number) => {
    if (!confirm('Supprimer ce chantier ?')) return
    deleteMutation.mutate(id, { onSuccess: () => toast.success('Chantier supprimé'), onError: () => toast.error('Erreur') })
  }

  return (
    <div className="space-y-6">
      <ChantierFilters search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusChange={setStatusFilter} typeFilter={typeFilter} onTypeChange={setTypeFilter} />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <HardHat className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">Aucun chantier trouvé</p>
            <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-2" /> Créer un chantier
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Rentabilité</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <ChantierCard key={c.id} chantier={c} onSelect={onSelectChantier} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <ChantierForm open={formOpen} onClose={() => setFormOpen(false)} chantier={editingChantier} />
    </div>
  )
}
