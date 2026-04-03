import { useState, useEffect, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/ui/dialog'
import { Button } from '../../../shared/ui/button'
import { Input } from '../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateRequest, useUpdateRequest } from '../hooks/useMatching'
import type { ProjectRequest, Urgency } from '../types/matching'
import { URGENCY_CONFIG } from '../types/matching'

interface RequestFormProps { open: boolean; onClose: () => void; request?: ProjectRequest | null }

export default function RequestForm({ open, onClose, request }: RequestFormProps) {
  const isEdit = !!request
  const createMutation = useCreateRequest()
  const updateMutation = useUpdateRequest()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [urgency, setUrgency] = useState<Urgency>('normal')

  useEffect(() => {
    if (request) {
      setTitle(request.title); setDescription(request.description); setCategory(request.category)
      setCity(request.city ?? ''); setBudgetMin(request.budget_min ?? ''); setBudgetMax(request.budget_max ?? '')
      setUrgency(request.urgency)
    } else {
      setTitle(''); setDescription(''); setCategory(''); setCity(''); setBudgetMin(''); setBudgetMax(''); setUrgency('normal')
    }
  }, [request, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) { toast.error('Titre et description obligatoires'); return }
    const payload = { title, description, category: category || 'autre', city: city || null, budget_min: budgetMin || null, budget_max: budgetMax || null, urgency }
    if (isEdit) {
      updateMutation.mutate({ id: request.id, ...payload }, { onSuccess: () => { toast.success('Demande mise à jour'); onClose() }, onError: () => toast.error('Erreur') })
    } else {
      createMutation.mutate(payload, { onSuccess: () => { toast.success('Demande créée'); onClose() }, onError: () => toast.error('Erreur') })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle>{isEdit ? 'Modifier la demande' : 'Nouvelle demande'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Rénovation salle de bain" className="h-11 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Description *</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Décris ton projet en détail..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label><Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Plomberie, Électricité..." className="h-11 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Ville</label><Input value={city} onChange={(e) => setCity(e.target.value)} className="h-11 rounded-xl" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Budget min (€)</label><Input type="number" min={0} value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} className="h-11 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Budget max (€)</label><Input type="number" min={0} value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} className="h-11 rounded-xl" /></div>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Urgence</label>
            <select value={urgency} onChange={(e) => setUrgency(e.target.value as Urgency)} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm">
              {(Object.entries(URGENCY_CONFIG) as [Urgency, { label: string }][]).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">{isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Créer'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
