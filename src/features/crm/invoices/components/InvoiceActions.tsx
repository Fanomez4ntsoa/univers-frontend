import { Send, CheckCircle, Edit, Trash2, XCircle } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import type { InvoiceStatus } from '../types/invoice'

interface InvoiceActionsProps {
  status: InvoiceStatus
  onEdit: () => void
  onDelete: () => void
  onSend: () => void
  onMarkPaid: () => void
  onCancel: () => void
}

export default function InvoiceActions({ status, onEdit, onDelete, onSend, onMarkPaid, onCancel }: InvoiceActionsProps) {
  if (status === 'paid' || status === 'cancelled') return null

  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      {status === 'draft' && (
        <>
          <Button variant="ghost" size="icon-sm" onClick={onSend} title="Envoyer"><Send className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={onEdit} title="Modifier"><Edit className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={onDelete} title="Supprimer" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
        </>
      )}
      {(status === 'sent' || status === 'pending' || status === 'overdue') && (
        <>
          <Button variant="ghost" size="icon-sm" onClick={onMarkPaid} title="Marquer payée" className="text-[#10B981]"><CheckCircle className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={onCancel} title="Annuler" className="text-red-500"><XCircle className="w-4 h-4" /></Button>
        </>
      )}
    </div>
  )
}
