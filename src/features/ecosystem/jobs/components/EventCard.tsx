import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, Wifi } from 'lucide-react'
import type { Event } from '../types/job'
import { EVENT_TYPE_CONFIG } from '../types/job'

interface EventCardProps { event: Event }

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return n === 0 ? 'Gratuit' : new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n)
}

function fmtDate(d: string) { return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }

export default function EventCard({ event }: EventCardProps) {
  const type = EVENT_TYPE_CONFIG[event.event_type]
  const spotsLeft = event.max_attendees ? event.max_attendees - event.attendees_count : null

  return (
    <Link to={`/events/${event.id}`} className="block">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-slate-900">{event.title}</h3>
            <p className="text-sm text-slate-500 line-clamp-2 mt-1">{event.description}</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${type.color}`}>{type.label}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-3">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{fmtDate(event.date)}</span>
          {event.is_online ? (
            <span className="flex items-center gap-1 text-[#1E40AF]"><Wifi className="w-3 h-3" />En ligne</span>
          ) : event.city && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.city}</span>
          )}
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.attendees_count} inscrits</span>
          {spotsLeft !== null && <span className={`font-medium ${spotsLeft > 0 ? 'text-[#10B981]' : 'text-red-500'}`}>{spotsLeft > 0 ? `${spotsLeft} places` : 'Complet'}</span>}
          <span className="font-medium text-[#1E40AF]">{fmt(event.price)}</span>
        </div>
      </div>
    </Link>
  )
}
