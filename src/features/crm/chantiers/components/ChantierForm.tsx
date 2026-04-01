import { useState, useEffect, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateChantier, useUpdateChantier } from '../hooks/useChantiers'
import { useClients } from '../../clients/hooks/useClients'
import { TYPE_CONFIG } from '../types/chantier'
import type { Chantier } from '../../../../shared/types/crm'
import type { ChantierType } from '../types/chantier'
import type { AxiosError } from 'axios'

interface ChantierFormProps { open: boolean; onClose: () => void; chantier?: Chantier | null }

export default function ChantierForm({ open, onClose, chantier }: ChantierFormProps) {
  const isEdit = !!chantier
  const { data: clients } = useClients()
  const createMutation = useCreateChantier()
  const updateMutation = useUpdateChantier()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [clientId, setClientId] = useState<number | ''>('')
  const [chantierType, setChantierType] = useState<ChantierType>('renovation')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [estimatedCost, setEstimatedCost] = useState('')

  useEffect(() => {
    if (chantier) {
      setClientId(chantier.client_id); setChantierType(chantier.chantier_type)
      setAddress(chantier.address ?? ''); setCity(chantier.city ?? '')
      setEstimatedCost(chantier.estimated_cost ?? '')
    } else {
      setClientId(''); setChantierType('renovation'); setAddress(''); setCity(''); setEstimatedCost('')
    }
  }, [chantier, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!clientId) { toast.error('Sélectionne un client'); return }
    const payload = { client_id: clientId, chantier_type: chantierType, address: address || null, city: city || null, estimated_cost: estimatedCost || '0' }
    const onError = (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>
      toast.error(axiosError.response?.data?.message ?? 'Une erreur est survenue')
    }
    if (isEdit) {
      updateMutation.mutate({ id: chantier.id, ...payload }, { onSuccess: () => { toast.success('Chantier mis à jour'); onClose() }, onError })
    } else {
      createMutation.mutate(payload, { onSuccess: () => { toast.success('Chantier créé'); onClose() }, onError })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle>{isEdit ? 'Modifier le chantier' : 'Nouveau chantier'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Client *</label>
            <select value={clientId} onChange={(e) => setClientId(e.target.value ? Number(e.target.value) : '')} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
              <option value="">Sélectionner un client</option>
              {clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type de chantier</label>
            <select value={chantierType} onChange={(e) => setChantierType(e.target.value as ChantierType)} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
              {(Object.entries(TYPE_CONFIG) as [ChantierType, string][]).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Adresse</label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="14 rue des Acacias" className="h-11 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ville</label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Paris" className="h-11 rounded-xl" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Coût estimé (€)</label>
            <Input type="number" min={0} step={0.01} value={estimatedCost} onChange={(e) => setEstimatedCost(e.target.value)} placeholder="5000" className="h-11 rounded-xl" />
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
