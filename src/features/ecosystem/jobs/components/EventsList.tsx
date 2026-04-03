import { useState } from 'react'
import { Search, Plus, CalendarDays } from 'lucide-react'
import { Input } from '../../../../shared/ui/input'
import { Button } from '../../../../shared/ui/button'
import { requireAuth } from '../../../../shared/lib/requireAuth'
import type { Event, EventType } from '../types/job'
import { EVENT_TYPE_CONFIG } from '../types/job'
import EventCard from './EventCard'
import EventForm from './EventForm'

interface EventsListProps { events: Event[] }

export default function EventsList({ events }: EventsListProps) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(10)

  const filtered = (events ?? []).filter((e) => {
    const q = search.toLowerCase()
    const matchesSearch = e.title.toLowerCase().includes(q) || e.city?.toLowerCase().includes(q)
    const matchesType = !typeFilter || e.event_type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un événement..." className="pl-10 h-11 rounded-xl" />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm">
            <option value="">Tous les types</option>
            {(Object.entries(EVENT_TYPE_CONFIG) as [EventType, { label: string }][]).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
          </select>
        </div>
        <Button onClick={() => requireAuth(() => setFormOpen(true))} className="bg-[#F97316] hover:bg-orange-600 rounded-lg text-white cursor-pointer">
          <Plus className="w-5 h-5 mr-2" /> Créer un événement
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Aucun événement trouvé</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">{filtered.slice(0, visibleCount).map((e) => <EventCard key={e.id} event={e} />)}</div>
          {visibleCount < filtered.length && (
            <div className="text-center">
              <button onClick={() => setVisibleCount((v) => v + 10)} className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Charger plus</button>
            </div>
          )}
        </>
      )}

      <EventForm open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  )
}
