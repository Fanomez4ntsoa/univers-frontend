import { useState, useEffect, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateClient, useUpdateClient } from '../hooks/useClients'
import type { Client } from '../../../../shared/types/crm'
import type { AxiosError } from 'axios'

interface ClientFormProps {
  open: boolean
  onClose: () => void
  client?: Client | null
}

const emptyForm = {
  name: '', email: '', phone: '', address: '', city: '',
  company_name: '', siret: '',
}

export default function ClientForm({ open, onClose, client }: ClientFormProps) {
  const [form, setForm] = useState(emptyForm)
  const isEdit = !!client

  const createMutation = useCreateClient()
  const updateMutation = useUpdateClient()
  const isPending = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name,
        email: client.email ?? '',
        phone: client.phone ?? '',
        address: client.address ?? '',
        city: client.city ?? '',
        company_name: client.company_name ?? '',
        siret: client.siret ?? '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [client, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) { toast.error('Le nom est obligatoire'); return }

    const payload = {
      ...form,
      email: form.email || null,
      phone: form.phone || null,
      address: form.address || null,
      city: form.city || null,
      company_name: form.company_name || null,
      siret: form.siret || null,
    }

    const onError = (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>
      toast.error(axiosError.response?.data?.message ?? 'Une erreur est survenue')
    }

    if (isEdit) {
      updateMutation.mutate({ id: client.id, ...payload }, {
        onSuccess: () => { toast.success('Client mis à jour'); onClose() },
        onError,
      })
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => { toast.success('Client créé'); onClose() },
        onError,
      })
    }
  }

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Modifier le client' : 'Nouveau client'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label>
            <Input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Jean Dupont" className="h-11 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jean@email.com" className="h-11 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
              <Input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="06 12 34 56 78" className="h-11 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Entreprise</label>
              <Input value={form.company_name} onChange={(e) => update('company_name', e.target.value)} placeholder="Société SARL" className="h-11 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SIRET</label>
              <Input value={form.siret} onChange={(e) => update('siret', e.target.value)} placeholder="123 456 789 00012" className="h-11 rounded-xl" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Adresse</label>
            <Input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="14 rue des Acacias" className="h-11 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ville</label>
            <Input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Paris" className="h-11 rounded-xl" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              {isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
