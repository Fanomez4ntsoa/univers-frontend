import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useAddNote } from '../hooks/useClients'

interface ClientNoteFormProps {
  clientId: number
}

export default function ClientNoteForm({ clientId }: ClientNoteFormProps) {
  const [content, setContent] = useState('')
  const addNote = useAddNote()

  const handleSubmit = () => {
    if (!content.trim()) return
    addNote.mutate(
      { clientId, content },
      {
        onSuccess: () => {
          toast.success('Note ajoutée')
          setContent('')
        },
        onError: () => toast.error("Erreur lors de l'ajout"),
      }
    )
  }

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Ajouter une note..."
        className="h-11 rounded-xl"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <Button
        onClick={handleSubmit}
        disabled={!content.trim() || addNote.isPending}
        className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer h-11 px-4"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  )
}
