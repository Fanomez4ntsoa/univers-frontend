import { Send, PenTool, Copy, FileText, Edit, Trash2 } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import type { QuoteStatus } from '../types/quote'
import { IMMUTABLE_STATUSES } from '../types/quote'

interface QuoteActionsProps {
  status: QuoteStatus
  onEdit: () => void
  onDelete: () => void
  onSend: () => void
  onSign: () => void
  onDuplicate: () => void
  onConvertInvoice: () => void
}

export default function QuoteActions({
  status, onEdit, onDelete, onSend, onSign, onDuplicate, onConvertInvoice,
}: QuoteActionsProps) {
  const immutable = IMMUTABLE_STATUSES.includes(status)

  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      {status === 'draft' && (
        <>
          <Button variant="ghost" size="icon-sm" onClick={onSend} title="Envoyer"><Send className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={onEdit} title="Modifier"><Edit className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={onDelete} title="Supprimer" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
        </>
      )}
      {status === 'sent' && (
        <>
          <Button variant="ghost" size="icon-sm" onClick={onSign} title="Signer"><PenTool className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={onDuplicate} title="Dupliquer"><Copy className="w-4 h-4" /></Button>
        </>
      )}
      {status === 'accepted' && (
        <>
          <Button variant="ghost" size="icon-sm" onClick={onConvertInvoice} title="Convertir en facture" className="text-[#F97316]"><FileText className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={onDuplicate} title="Dupliquer"><Copy className="w-4 h-4" /></Button>
        </>
      )}
      {status === 'invoiced' && (
        <Button variant="ghost" size="icon-sm" onClick={onDuplicate} title="Dupliquer"><Copy className="w-4 h-4" /></Button>
      )}
      {(status === 'refused' || status === 'expired') && (
        <>
          <Button variant="ghost" size="icon-sm" onClick={onDuplicate} title="Dupliquer"><Copy className="w-4 h-4" /></Button>
          {!immutable && (
            <Button variant="ghost" size="icon-sm" onClick={onDelete} title="Supprimer" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
          )}
        </>
      )}
    </div>
  )
}
