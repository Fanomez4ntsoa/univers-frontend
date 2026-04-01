import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../shared/ui/table'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import type { Prospect } from '../types/prospect'
import { useDeleteProspect, useConvertProspect } from '../hooks/useProspects'
import ProspectCard from './ProspectCard'
import ProspectForm from './ProspectForm'
import ProspectFilters from './ProspectFilters'

interface ProspectsListProps {
  data: Prospect[]
}

export default function ProspectsList({ data }: ProspectsListProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pipelineFilter, setPipelineFilter] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingProspect, setEditingProspect] = useState<Prospect | null>(null)

  const deleteMutation = useDeleteProspect()
  const convertMutation = useConvertProspect()

  const filtered = data.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.phone?.includes(search)
    const matchesStatus = !statusFilter || p.status === statusFilter
    const matchesPipeline = !pipelineFilter || p.pipeline_stage === pipelineFilter
    return matchesSearch && matchesStatus && matchesPipeline
  })

  const handleEdit = (prospect: Prospect) => {
    setEditingProspect(prospect)
    setFormOpen(true)
  }

  const handleCreate = () => {
    setEditingProspect(null)
    setFormOpen(true)
  }

  const handleDelete = (id: number) => {
    if (!confirm('Supprimer ce prospect ?')) return
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success('Prospect supprimé'),
      onError: () => toast.error('Erreur lors de la suppression'),
    })
  }

  const handleConvert = (id: number) => {
    if (!confirm('Convertir ce prospect en client ?')) return
    convertMutation.mutate(id, {
      onSuccess: () => toast.success('Prospect converti en client'),
      onError: () => toast.error('Erreur lors de la conversion'),
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prospects</h1>
          <p className="text-slate-500 text-sm">Gère tes opportunités commerciales</p>
        </div>
        <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau prospect
        </Button>
      </div>

      {/* Filters */}
      <ProspectFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        pipelineFilter={pipelineFilter}
        onPipelineChange={setPipelineFilter}
      />

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">Aucun prospect trouvé</p>
            <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un prospect
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Pipeline</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((prospect) => (
                <ProspectCard
                  key={prospect.id}
                  prospect={prospect}
                  onEdit={handleEdit}
                  onConvert={handleConvert}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Form Modal */}
      <ProspectForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        prospect={editingProspect}
      />
    </div>
  )
}
