import { useState, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useMarkPaid } from '../hooks/useInvoices'

interface MarkPaidModalProps {
  open: boolean
  onClose: () => void
  invoiceId: number
  total: string
}

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0)
}

export default function MarkPaidModal({ open, onClose, invoiceId, total }: MarkPaidModalProps) {
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0])
  const [paymentMethod, setPaymentMethod] = useState('virement')
  const markPaid = useMarkPaid()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    markPaid.mutate(
      { id: invoiceId, payment_date: paymentDate, payment_method: paymentMethod },
      {
        onSuccess: () => { toast.success('Facture marquée comme payée'); onClose() },
        onError: () => toast.error('Erreur lors du marquage'),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmer le paiement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="text-center py-3">
            <p className="text-sm text-slate-500">Montant</p>
            <p className="text-2xl font-bold text-[#1E40AF]">{fmt(total)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date de paiement</label>
            <Input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="h-11 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mode de paiement</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
            >
              <option value="virement">Virement</option>
              <option value="cheque">Chèque</option>
              <option value="especes">Espèces</option>
              <option value="cb">Carte bancaire</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={markPaid.isPending} className="bg-[#10B981] hover:bg-emerald-600 rounded-lg text-white cursor-pointer">
              {markPaid.isPending ? 'En cours...' : 'Confirmer le paiement'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
