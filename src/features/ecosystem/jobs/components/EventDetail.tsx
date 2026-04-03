import { useState } from 'react'
import { ArrowLeft, MapPin, Calendar, Users, Wifi, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'
import { requireAuth } from '../../../../shared/lib/requireAuth'
import { useEvent, useAttendEvent } from '../hooks/useEvents'
import { EVENT_TYPE_CONFIG } from '../types/job'
import PageSkeleton from '../../../../shared/components/PageSkeleton'
import { formatDateTime } from '../../../../shared/lib/utils'

interface EventDetailProps { eventId: number }

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return n === 0 ? 'Gratuit' : new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n)
}

export default function EventDetail({ eventId }: EventDetailProps) {
  const { data: event, isLoading } = useEvent(eventId)
  const attendMutation = useAttendEvent()
  const [localAttending, setLocalAttending] = useState<boolean | null>(null)

  if (isLoading || !event) return <PageSkeleton />

  const type = EVENT_TYPE_CONFIG[event.event_type]
  const isAttending = localAttending ?? event.is_attending
  const spotsLeft = event.max_attendees ? event.max_attendees - event.attendees_count : null
  const isFull = spotsLeft !== null && spotsLeft <= 0 && !isAttending

  const handleAttend = () => {
    requireAuth(() => {
      setLocalAttending(!isAttending)
      attendMutation.mutate(event.id)
    })
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/jobs"><Button variant="ghost" size="icon" className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <div className="flex-1">
          <div className="flex items-center gap-3"><h1 className="text-2xl font-bold text-slate-900">{event.title}</h1><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${type.color}`}>{type.label}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Description</h2>
          <p className="text-sm text-slate-600 whitespace-pre-wrap">{event.description}</p>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <p className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="w-4 h-4" />{formatDateTime(event.start_date)}</p>
            {event.is_online ? (
              <p className="flex items-center gap-2 text-sm text-[#1E40AF]"><Wifi className="w-4 h-4" />En ligne</p>
            ) : event.city && (
              <p className="flex items-center gap-2 text-sm text-slate-600"><MapPin className="w-4 h-4" />{event.address ? `${event.address}, ` : ''}{event.city}</p>
            )}
            <p className="flex items-center gap-2 text-sm text-slate-600"><Users className="w-4 h-4" />{event.attendees_count} inscrits{spotsLeft !== null && ` · ${spotsLeft} places restantes`}</p>
            <p className="text-lg font-bold text-[#1E40AF]">{fmt(event.price)}</p>
          </div>

          <Button onClick={handleAttend} disabled={isFull} className={`w-full rounded-lg cursor-pointer ${isAttending ? 'bg-[#10B981] hover:bg-emerald-600 text-white' : 'bg-[#F97316] hover:bg-orange-600 text-white'}`}>
            {isAttending ? <><CheckCircle className="w-4 h-4 mr-2" />Inscrit</> : isFull ? 'Complet' : "S'inscrire"}
          </Button>
        </div>
      </div>
    </div>
  )
}
