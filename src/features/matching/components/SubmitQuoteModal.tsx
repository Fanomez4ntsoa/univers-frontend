import { useState, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/ui/dialog'
import { Button } from '../../../shared/ui/button'
import { Input } from '../../../shared/ui/input'
import { toast } from 'sonner'
import { useSubmitQuote } from '../hooks/useMatching'
import type { ProjectRequest } from '../types/matching'

interface SubmitQuoteModalProps { open: boolean; onClose: () => void; request: ProjectRequest }

export default function SubmitQuoteModal({ open, onClose, request }: SubmitQuoteModalProps) {
  const [price, setPrice] = useState('')
  const [estimatedDays, setEstimatedDays] = useState('')
  const [message, setMessage] = useState('')
  const submitMutation = useSubmitQuote()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!price || !message.trim()) { toast.error('Prix et message obligatoires'); return }
    submitMutation.mutate(
      { requestId: request.id, price, estimated_days: estimatedDays ? Number(estimatedDays) : undefined, message },
      { onSuccess: () => { toast.success('Devis envoyé'); onClose() }, onError: () => toast.error('Erreur — tu as peut-être déjà soumis un devis') }
    )
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Devis — {request.title}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Prix (€) *</label><Input type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(e.target.value)} className="h-11 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Délai (jours)</label><Input type="number" min={1} value={estimatedDays} onChange={(e) => setEstimatedDays(e.target.value)} className="h-11 rounded-xl" /></div>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Message *</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Décris ta proposition..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20" /></div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={submitMutation.isPending} className="bg-[#F97316] hover:bg-orange-600 rounded-lg text-white cursor-pointer">{submitMutation.isPending ? 'Envoi...' : 'Soumettre le devis'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
