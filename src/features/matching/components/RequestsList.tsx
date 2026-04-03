import { useState } from 'react'
import { Plus, FileSearch } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import { toast } from 'sonner'
import type { ProjectRequest } from '../types/matching'
import { useDeleteRequest } from '../hooks/useMatching'
import RequestCard from './RequestCard'
import RequestForm from './RequestForm'

interface RequestsListProps { requests: ProjectRequest[] }

export default function RequestsList({ requests }: RequestsListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingRequest, setEditingRequest] = useState<ProjectRequest | null>(null)
  const deleteMutation = useDeleteRequest()

  const handleEdit = (r: ProjectRequest) => { setEditingRequest(r); setFormOpen(true) }
  const handleCreate = () => { setEditingRequest(null); setFormOpen(true) }
  const handleDelete = (id: number) => {
    if (!confirm('Supprimer cette demande ?')) return
    deleteMutation.mutate(id, { onSuccess: () => toast.success('Demande supprimée'), onError: () => toast.error('Erreur') })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes demandes</h1>
          <p className="text-slate-500 text-sm">Tes demandes de travaux et devis reçus</p>
        </div>
        <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
          <Plus className="w-5 h-5 mr-2" /> Nouvelle demande
        </Button>
      </div>

      {(requests ?? []).length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <FileSearch className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">Aucune demande — décris ton projet pour recevoir des devis</p>
          <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" /> Créer une demande
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {(requests ?? []).map((r) => <RequestCard key={r.id} request={r} onEdit={handleEdit} onDelete={handleDelete} />)}
        </div>
      )}

      <RequestForm open={formOpen} onClose={() => setFormOpen(false)} request={editingRequest} />
    </div>
  )
}
