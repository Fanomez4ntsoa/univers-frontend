import { useState, useEffect, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateListing, useUpdateListing } from '../hooks/useListings'
import type { Listing, PriceType, Condition } from '../types/listing'
import { PRICE_TYPE_CONFIG, CONDITION_CONFIG } from '../types/listing'

interface ListingFormProps { open: boolean; onClose: () => void; listing?: Listing | null }

export default function ListingForm({ open, onClose, listing }: ListingFormProps) {
  const isEdit = !!listing
  const createMutation = useCreateListing()
  const updateMutation = useUpdateListing()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [priceType, setPriceType] = useState<PriceType>('fixed')
  const [condition, setCondition] = useState<Condition>('used')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')

  useEffect(() => {
    if (listing) {
      setTitle(listing.title); setDescription(listing.description ?? ''); setPrice(listing.price)
      setPriceType(listing.price_type); setCondition(listing.condition)
      setCategory(listing.category ?? ''); setCity(listing.city ?? ''); setPostalCode(listing.postal_code ?? '')
    } else {
      setTitle(''); setDescription(''); setPrice(''); setPriceType('fixed'); setCondition('used')
      setCategory(''); setCity(''); setPostalCode('')
    }
  }, [listing, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { toast.error('Le titre est obligatoire'); return }
    const payload = {
      title, description: description || null, price: price || '0', price_type: priceType, condition,
      category: category || null, city: city || null, postal_code: postalCode || null,
    }
    if (isEdit) {
      updateMutation.mutate({ id: listing.id, ...payload }, { onSuccess: () => { toast.success('Annonce mise à jour'); onClose() }, onError: () => toast.error('Erreur') })
    } else {
      createMutation.mutate(payload, { onSuccess: () => { toast.success('Annonce créée'); onClose() }, onError: () => toast.error('Erreur') })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle>{isEdit ? 'Modifier l\'annonce' : 'Nouvelle annonce'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Perceuse Bosch Professional" className="h-11 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Décris ton article..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Prix (€)</label><Input type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(e.target.value)} className="h-11 rounded-xl" /></div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type de prix</label>
              <select value={priceType} onChange={(e) => setPriceType(e.target.value as PriceType)} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
                {(Object.entries(PRICE_TYPE_CONFIG) as [PriceType, { label: string }][]).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">État</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value as Condition)} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
                {(Object.entries(CONDITION_CONFIG) as [Condition, { label: string }][]).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
                <option value="">Choisir une catégorie</option>
                <option value="materiaux">Matériaux</option>
                <option value="outils">Outils</option>
                <option value="equipements">Équipements</option>
                <option value="surplus_chantier">Surplus chantier</option>
                <option value="occasion">Occasion</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Ville</label><Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Paris" className="h-11 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Code postal</label><Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="75001" className="h-11 rounded-xl" /></div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">{isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Publier'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
