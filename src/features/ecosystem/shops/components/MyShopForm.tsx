import { useState, useEffect, type FormEvent } from 'react'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useUpdateMyShop } from '../hooks/useShops'
import type { MyShop } from '../types/shop'

interface MyShopFormProps { shop: MyShop }

export default function MyShopForm({ shop }: MyShopFormProps) {
  const updateMutation = useUpdateMyShop()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  useEffect(() => {
    setName(shop.name ?? ''); setDescription(shop.description ?? '')
    setCategory(shop.category ?? ''); setCity(shop.city ?? '')
    setAddress(shop.address ?? ''); setPhone(shop.phone ?? '')
    setEmail(shop.email ?? ''); setLogoUrl(shop.logo_url ?? '')
  }, [shop])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(
      { name, description: description || null, category: category || null, city: city || null, address: address || null, phone: phone || null, email: email || null, logo_url: logoUrl || null },
      { onSuccess: () => toast.success('Boutique mise à jour'), onError: () => toast.error('Erreur') }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label><Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-xl" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label><Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Plomberie, Électricité..." className="h-11 rounded-xl" /></div>
      </div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Ville</label><Input value={city} onChange={(e) => setCity(e.target.value)} className="h-11 rounded-xl" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Adresse</label><Input value={address} onChange={(e) => setAddress(e.target.value)} className="h-11 rounded-xl" /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label><Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-xl" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" /></div>
      </div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">URL du logo</label><Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." className="h-11 rounded-xl" /></div>
      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={updateMutation.isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
          {updateMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      </div>
    </form>
  )
}
