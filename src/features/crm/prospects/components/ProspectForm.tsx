import { useState, useEffect, type FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateProspect, useUpdateProspect } from '../hooks/useProspects'
import type { Prospect, ProspectStatus, PipelineStage } from '../types/prospect'
import { STATUS_CONFIG, PIPELINE_CONFIG } from '../types/prospect'
import type { AxiosError } from 'axios'

interface ProspectFormProps {
  open: boolean
  onClose: () => void
  prospect?: Prospect | null
}

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  city: '',
  source: '',
  status: 'new' as ProspectStatus,
  pipeline_stage: 'prospect' as PipelineStage,
  notes: '',
}

export default function ProspectForm({ open, onClose, prospect }: ProspectFormProps) {
  const [form, setForm] = useState(emptyForm)
  const isEdit = !!prospect

  const createMutation = useCreateProspect()
  const updateMutation = useUpdateProspect()
  const isPending = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (prospect) {
      setForm({
        name: prospect.name,
        email: prospect.email ?? '',
        phone: prospect.phone ?? '',
        city: prospect.city ?? '',
        source: prospect.source ?? '',
        status: prospect.status,
        pipeline_stage: prospect.pipeline_stage,
        notes: prospect.notes ?? '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [prospect, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!form.name.trim()) {
      toast.error('Le nom est obligatoire')
      return
    }

    const payload = {
      ...form,
      email: form.email || null,
      phone: form.phone || null,
      city: form.city || null,
      source: form.source || null,
      notes: form.notes || null,
    }

    const onError = (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>
      toast.error(axiosError.response?.data?.message ?? 'Une erreur est survenue')
    }

    if (isEdit) {
      updateMutation.mutate(
        { id: prospect.id, ...payload },
        {
          onSuccess: () => {
            toast.success('Prospect mis à jour')
            onClose()
          },
          onError,
        }
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Prospect créé')
          onClose()
        },
        onError,
      })
    }
  }

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Modifier le prospect' : 'Nouveau prospect'}</DialogTitle>
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
              <label className="block text-sm font-medium text-slate-700 mb-1">Ville</label>
              <Input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Paris" className="h-11 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Source</label>
              <Input value={form.source} onChange={(e) => update('source', e.target.value)} placeholder="Site web, recommandation..." className="h-11 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Statut</label>
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
                className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              >
                {(Object.entries(STATUS_CONFIG) as [ProspectStatus, { label: string }][]).map(([value, { label }]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pipeline</label>
              <select
                value={form.pipeline_stage}
                onChange={(e) => update('pipeline_stage', e.target.value)}
                className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              >
                {(Object.entries(PIPELINE_CONFIG) as [PipelineStage, { label: string }][]).map(([value, { label }]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              rows={3}
              placeholder="Notes sur le prospect..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">
              Annuler
            </Button>
            <Button type="submit" disabled={isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              {isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
