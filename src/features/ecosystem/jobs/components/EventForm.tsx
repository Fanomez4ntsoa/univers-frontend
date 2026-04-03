import { useState, useEffect, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateEvent, useUpdateEvent } from '../hooks/useEvents'
import type { Event, EventType } from '../types/job'
import { EVENT_TYPE_CONFIG } from '../types/job'

interface EventFormProps { open: boolean; onClose: () => void; event?: Event | null }

export default function EventForm({ open, onClose, event }: EventFormProps) {
  const isEdit = !!event
  const createMutation = useCreateEvent()
  const updateMutation = useUpdateEvent()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [eventType, setEventType] = useState<EventType>('salon')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('0')
  const [isOnline, setIsOnline] = useState(false)
  const [maxAttendees, setMaxAttendees] = useState('')

  useEffect(() => {
    if (event) {
      setTitle(event.title); setDescription(event.description); setEventType(event.event_type)
      setCity(event.city ?? ''); setDate(event.start_date?.split('T')[0] ?? ''); setPrice(event.price)
      setIsOnline(event.is_online); setMaxAttendees(event.max_attendees ? String(event.max_attendees) : '')
    } else {
      setTitle(''); setDescription(''); setEventType('salon'); setCity(''); setDate(''); setPrice('0'); setIsOnline(false); setMaxAttendees('')
    }
  }, [event, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !date) { toast.error('Titre et date obligatoires'); return }
    const payload = { title, description, event_type: eventType, city: city || null, start_date: date, price: price || '0', is_online: isOnline, max_attendees: maxAttendees ? Number(maxAttendees) : null }
    if (isEdit) {
      updateMutation.mutate({ id: event.id, ...payload }, { onSuccess: () => { toast.success('Événement mis à jour'); onClose() }, onError: () => toast.error('Erreur') })
    } else {
      createMutation.mutate(payload, { onSuccess: () => { toast.success('Événement créé'); onClose() }, onError: () => toast.error('Erreur') })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{isEdit ? "Modifier l'événement" : 'Nouvel événement'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Salon du bâtiment 2026" className="h-11 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Type</label><select value={eventType} onChange={(e) => setEventType(e.target.value as EventType)} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm">{(Object.entries(EVENT_TYPE_CONFIG) as [EventType, { label: string }][]).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Date *</label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 rounded-xl" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Ville</label><Input value={city} onChange={(e) => setCity(e.target.value)} className="h-11 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Prix (€)</label><Input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="h-11 rounded-xl" /></div>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Places max</label><Input type="number" min={1} value={maxAttendees} onChange={(e) => setMaxAttendees(e.target.value)} placeholder="Illimité si vide" className="h-11 rounded-xl" /></div>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={isOnline} onChange={(e) => setIsOnline(e.target.checked)} className="rounded" /><span className="text-sm text-slate-700">Événement en ligne</span></label>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={isPending} className="bg-[#F97316] hover:bg-orange-600 rounded-lg text-white cursor-pointer">{isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Créer'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
