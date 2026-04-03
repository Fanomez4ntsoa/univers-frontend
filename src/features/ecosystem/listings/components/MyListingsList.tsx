import { useState } from 'react'
import { Plus, Edit, Trash2, CheckCircle, ShoppingBag } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import type { Listing } from '../types/listing'
import { STATUS_CONFIG, PRICE_TYPE_CONFIG } from '../types/listing'
import { useDeleteListing, useMarkSold } from '../hooks/useListings'
import ListingForm from './ListingForm'

interface MyListingsListProps { listings: Listing[] }

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n || 0)
}

export default function MyListingsList({ listings }: MyListingsListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingListing, setEditingListing] = useState<Listing | null>(null)
  const deleteMutation = useDeleteListing()
  const markSoldMutation = useMarkSold()

  const handleCreate = () => { setEditingListing(null); setFormOpen(true) }
  const handleEdit = (l: Listing) => { setEditingListing(l); setFormOpen(true) }
  const handleDelete = (id: number) => {
    if (!confirm('Supprimer cette annonce ?')) return
    deleteMutation.mutate(id, { onSuccess: () => toast.success('Annonce supprimée'), onError: () => toast.error('Erreur') })
  }
  const handleMarkSold = (id: number) => {
    markSoldMutation.mutate(id, { onSuccess: () => toast.success('Marquée comme vendue'), onError: () => toast.error('Erreur') })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
          <Plus className="w-5 h-5 mr-2" /> Nouvelle annonce
        </Button>
      </div>

      {(listings ?? []).length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">Aucune annonce — publie ta première annonce</p>
          <Button onClick={handleCreate} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" /> Publier une annonce
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {(listings ?? []).map((l) => {
            const status = STATUS_CONFIG[l.status]
            const priceType = PRICE_TYPE_CONFIG[l.price_type]
            return (
              <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 truncate">{l.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priceType.color}`}>{priceType.label}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{l.price_type === 'free' ? 'Gratuit' : fmt(l.price)} · {l.views_count} vues</p>
                </div>
                <div className="flex items-center gap-1">
                  {l.status === 'active' && (
                    <Button variant="ghost" size="icon-sm" onClick={() => handleMarkSold(l.id)} title="Marquer vendu" className="text-[#10B981]"><CheckCircle className="w-4 h-4" /></Button>
                  )}
                  <Button variant="ghost" size="icon-sm" onClick={() => handleEdit(l)} title="Modifier"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(l.id)} title="Supprimer" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ListingForm open={formOpen} onClose={() => setFormOpen(false)} listing={editingListing} />
    </div>
  )
}
