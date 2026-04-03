import { Link } from 'react-router-dom'
import { Clock, Euro } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import type { ProjectQuote } from '../types/matching'

interface QuoteCardProps {
  quote: ProjectQuote
  canAccept: boolean
  onAccept: (quoteId: number) => void
}

const QUOTE_STATUS: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700' },
  accepted: { label: 'Accepté', color: 'bg-green-100 text-green-700' },
  refused: { label: 'Refusé', color: 'bg-red-100 text-red-700' },
}

export default function QuoteCard({ quote, canAccept, onAccept }: QuoteCardProps) {
  const status = QUOTE_STATUS[quote.status] ?? QUOTE_STATUS.pending

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <Link to={`/profile/${quote.artisan.id}`} className="flex items-center gap-3 hover:underline">
          <div className="w-10 h-10 rounded-full bg-[#1E40AF]/10 flex items-center justify-center">
            {quote.artisan.avatar_url ? <img src={quote.artisan.avatar_url} alt="" className="w-full h-full rounded-full object-cover" /> : <span className="text-[#1E40AF] font-semibold text-sm">{quote.artisan.display_name.charAt(0).toUpperCase()}</span>}
          </div>
          <div>
            <p className="font-medium text-slate-900 text-sm">{quote.artisan.display_name}</p>
            {quote.artisan.metier && <p className="text-xs text-[#1E40AF]">{quote.artisan.metier}</p>}
          </div>
        </Link>
        <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
      </div>
      <p className="text-sm text-slate-600 mb-3">{quote.message}</p>
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1 font-bold text-[#1E40AF]"><Euro className="w-4 h-4" />{quote.price}€</span>
        {quote.estimated_days && <span className="flex items-center gap-1 text-slate-500"><Clock className="w-4 h-4" />{quote.estimated_days} jours</span>}
      </div>
      {canAccept && quote.status === 'pending' && (
        <Button onClick={() => onAccept(quote.id)} className="w-full mt-3 bg-[#10B981] hover:bg-emerald-600 rounded-lg text-white cursor-pointer">Accepter ce devis</Button>
      )}
    </div>
  )
}
