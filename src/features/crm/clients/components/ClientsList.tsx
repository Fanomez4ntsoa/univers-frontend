import { useState } from 'react'
import { Plus, Building, Search } from 'lucide-react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../../../shared/ui/table'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import type { Client } from '../../../../shared/types/crm'
import { useDeleteClient } from '../hooks/useClients'
import ClientCard from './ClientCard'
import ClientForm from './ClientForm'

interface ClientsListProps {
  data: Client[]
  onSelectClient: (client: Client) => void
}

export default function ClientsList({ data, onSelectClient }: ClientsListProps) {
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const deleteMutation = useDeleteClient()

  const filtered = data.filter((c) => {
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.company_name?.toLowerCase().includes(q)
  })

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormOpen(true)
  }

  const handleCreate = () => {
    setEditingClient(null)
    setFormOpen(true)
  }

  const handleDelete = (id: number) => {
    if (!confirm('Supprimer ce client ?')) return
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success('Client supprimé'),
      onError: () => toast.error('Erreur lors de la suppression'),
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-500 text-sm">Ta base de données clients</p>
        </div>
        <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau client
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un client..."
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">Aucun client trouvé</p>
            <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un client
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Devis</TableHead>
                <TableHead>Factures</TableHead>
                <TableHead>CA total</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onSelect={onSelectClient}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <ClientForm open={formOpen} onClose={() => setFormOpen(false)} client={editingClient} />
    </div>
  )
}
