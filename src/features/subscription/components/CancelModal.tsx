import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/ui/dialog'
import { Button } from '../../../shared/ui/button'
import { toast } from 'sonner'
import { useCancelSubscription } from '../hooks/useSubscription'
import { useQueryClient } from '@tanstack/react-query'

interface CancelModalProps {
  open: boolean
  onClose: () => void
}

export default function CancelModal({ open, onClose }: CancelModalProps) {
  const cancelMutation = useCancelSubscription()
  const qc = useQueryClient()

  const handleCancel = () => {
    cancelMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Abonnement annulé — il reste actif jusqu\'à la fin de la période')
        qc.invalidateQueries({ queryKey: ['subscription-status'] })
        onClose()
      },
      onError: () => toast.error('Erreur lors de l\'annulation'),
    })
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Annuler ton abonnement ?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <p className="text-sm text-slate-600">
            Ton abonnement restera actif jusqu'à la fin de la période en cours. Tu pourras te réabonner à tout moment.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="rounded-lg">Garder</Button>
            <Button onClick={handleCancel} disabled={cancelMutation.isPending} className="bg-red-500 hover:bg-red-600 rounded-lg text-white cursor-pointer">
              {cancelMutation.isPending ? 'Annulation...' : 'Confirmer l\'annulation'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
