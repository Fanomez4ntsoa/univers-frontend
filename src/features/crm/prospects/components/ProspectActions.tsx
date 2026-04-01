import { Edit, Trash2, UserCheck } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'

interface ProspectActionsProps {
  onEdit: () => void
  onConvert: () => void
  onDelete: () => void
  isConverted: boolean
}

export default function ProspectActions({ onEdit, onConvert, onDelete, isConverted }: ProspectActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon-sm" onClick={onEdit} title="Modifier">
        <Edit className="w-4 h-4" />
      </Button>
      {!isConverted && (
        <Button variant="ghost" size="icon-sm" onClick={onConvert} title="Convertir en client" className="text-green-600 hover:text-green-700">
          <UserCheck className="w-4 h-4" />
        </Button>
      )}
      <Button variant="ghost" size="icon-sm" onClick={onDelete} title="Supprimer" className="text-red-500 hover:text-red-600">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
