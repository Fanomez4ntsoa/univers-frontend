import { Link } from 'react-router-dom'
import { FileCheck, Euro, Clock } from 'lucide-react'
import type { ProjectQuote, ProjectRequest } from '../types/matching'
import { STATUS_CONFIG } from '../types/matching'

interface MyQuotesListProps { quotes: (ProjectQuote & { request: ProjectRequest })[] }

const QUOTE_STATUS: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700' },
  accepted: { label: 'Accepté', color: 'bg-green-100 text-green-700' },
  refused: { label: 'Refusé', color: 'bg-red-100 text-red-700' },
}

export default function MyQuotesList({ quotes }: MyQuotesListProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mes devis</h1>
        <p className="text-slate-500 text-sm">Tes devis soumis aux demandes de particuliers</p>
      </div>

      {(quotes ?? []).length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Aucun devis soumis — consulte les demandes disponibles</p>
          <Link to="/matching/available" className="text-[#1E40AF] hover:underline text-sm mt-2 inline-block">Voir les demandes</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {(quotes ?? []).map((q) => {
            const qStatus = QUOTE_STATUS[q.status] ?? QUOTE_STATUS.pending
            const rStatus = STATUS_CONFIG[q.request.status]
            return (
              <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{q.request.title}</h3>
                    <p className="text-xs text-slate-400">{q.request.category} · {q.request.city ?? 'Non précisé'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${qStatus.color}`}>{qStatus.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${rStatus.color}`}>{rStatus.label}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mb-2">{q.message}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 font-bold text-[#1E40AF]"><Euro className="w-4 h-4" />{q.price}€</span>
                  {q.estimated_days && <span className="flex items-center gap-1 text-slate-500"><Clock className="w-4 h-4" />{q.estimated_days} jours</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
