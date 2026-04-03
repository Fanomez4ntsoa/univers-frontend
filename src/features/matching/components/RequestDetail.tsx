import { ArrowLeft, MapPin, Briefcase, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../shared/ui/button'
import { toast } from 'sonner'
import { useRequest, useAcceptQuote, useCloseRequest } from '../hooks/useMatching'
import { URGENCY_CONFIG, STATUS_CONFIG } from '../types/matching'
import { formatDate } from '../../../shared/lib/utils'
import QuoteCard from './QuoteCard'
import PageSkeleton from '../../../shared/components/PageSkeleton'

interface RequestDetailProps { requestId: number }

export default function RequestDetail({ requestId }: RequestDetailProps) {
  const { data, isLoading } = useRequest(requestId)
  const acceptMutation = useAcceptQuote()
  const closeMutation = useCloseRequest()

  if (isLoading || !data?.request) return <PageSkeleton />

  const request = data.request
  const quotes = data.quotes ?? []
  const urgency = URGENCY_CONFIG[request.urgency]
  const status = STATUS_CONFIG[request.status]
  const isOpen = request.status === 'open'

  const handleAccept = (quoteId: number) => {
    if (!confirm('Accepter ce devis ? Les autres seront automatiquement refusés.')) return
    acceptMutation.mutate({ requestId, quoteId }, { onSuccess: () => toast.success('Devis accepté'), onError: () => toast.error('Erreur') })
  }

  const handleClose = () => {
    if (!confirm('Fermer cette demande ?')) return
    closeMutation.mutate(requestId, { onSuccess: () => toast.success('Demande fermée'), onError: () => toast.error('Erreur') })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/matching/requests"><Button variant="ghost" size="icon" className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{request.title}</h1>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${urgency.color}`}>{urgency.label}</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>{status.label}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Détails</h3>
            <p className="text-sm text-slate-600 whitespace-pre-wrap">{request.description}</p>
            <div className="space-y-2 pt-2 border-t border-slate-100 text-sm text-slate-600">
              <p className="flex items-center gap-2"><Briefcase className="w-4 h-4" />{request.category}</p>
              {request.city && <p className="flex items-center gap-2"><MapPin className="w-4 h-4" />{request.city}</p>}
              {request.budget_min && <p className="font-medium text-[#1E40AF]">{request.budget_min}€{request.budget_max ? ` - ${request.budget_max}€` : '+'}</p>}
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(request.created_at)}</p>
            </div>
          </div>
          {isOpen && (
            <Button variant="outline" onClick={handleClose} className="w-full rounded-lg text-red-500 hover:text-red-600">Fermer cette demande</Button>
          )}
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Devis reçus ({quotes.length})</h2>
          {quotes.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-400">Aucun devis reçu pour le moment</p>
            </div>
          ) : (
            <div className="space-y-4">{quotes.map((q) => <QuoteCard key={q.id} quote={q} canAccept={isOpen} onAccept={handleAccept} />)}</div>
          )}
        </div>
      </div>
    </div>
  )
}
