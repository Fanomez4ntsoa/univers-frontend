import { useState, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useApplyJob } from '../hooks/useJobs'

interface ApplyModalProps { open: boolean; onClose: () => void; jobId: number; jobTitle: string }

export default function ApplyModal({ open, onClose, jobId, jobTitle }: ApplyModalProps) {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const applyMutation = useApplyJob()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !email.trim()) { toast.error('Message et email obligatoires'); return }
    applyMutation.mutate(
      { jobId, message, email, phone: phone || undefined },
      { onSuccess: () => { toast.success('Candidature envoyée'); onClose() }, onError: () => toast.error('Tu as déjà postulé ou une erreur est survenue') }
    )
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Postuler — {jobTitle}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Message de motivation *</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Pourquoi es-tu intéressé par ce poste ?" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Email *</label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ton@email.com" className="h-11 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 12 34 56 78" className="h-11 rounded-xl" /></div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={applyMutation.isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">{applyMutation.isPending ? 'Envoi...' : 'Envoyer ma candidature'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
