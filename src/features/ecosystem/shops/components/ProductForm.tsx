import { useState, useEffect, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateProduct, useUpdateProduct } from '../hooks/useShops'
import type { ShopProduct } from '../types/shop'

interface ProductFormProps { open: boolean; onClose: () => void; product?: ShopProduct | null }

export default function ProductForm({ open, onClose, product }: ProductFormProps) {
  const isEdit = !!product
  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState(0)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (product) { setName(product.name); setDescription(product.description ?? ''); setPrice(product.price); setStock(product.stock); setImageUrl(product.image_url ?? '') }
    else { setName(''); setDescription(''); setPrice(''); setStock(0); setImageUrl('') }
  }, [product, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { toast.error('Le nom est obligatoire'); return }
    const payload = { name, description: description || null, price: price || '0', stock, image_url: imageUrl || null, is_active: true }
    if (isEdit) {
      updateMutation.mutate({ id: product.id, ...payload }, { onSuccess: () => { toast.success('Produit mis à jour'); onClose() }, onError: () => toast.error('Erreur') })
    } else {
      createMutation.mutate(payload, { onSuccess: () => { toast.success('Produit créé'); onClose() }, onError: () => toast.error('Erreur') })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>{isEdit ? 'Modifier le produit' : 'Nouveau produit'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Robinet mitigeur" className="h-11 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Description..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Prix (€)</label><Input type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(e.target.value)} className="h-11 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Stock</label><Input type="number" min={0} value={stock} onChange={(e) => setStock(Number(e.target.value))} className="h-11 rounded-xl" /></div>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">URL de l'image</label><Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="h-11 rounded-xl" /></div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">{isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Créer'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
