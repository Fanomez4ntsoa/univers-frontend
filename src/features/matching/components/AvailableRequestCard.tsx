import { MapPin, Briefcase, Euro } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import type { ProjectRequest } from '../types/matching'
import { URGENCY_CONFIG } from '../types/matching'

interface AvailableRequestCardProps {
  request: ProjectRequest
  onSubmitQuote: (request: ProjectRequest) => void
}

export default function AvailableRequestCard({ request, onSubmitQuote }: AvailableRequestCardProps) {
  const urgency = URGENCY_CONFIG[request.urgency]

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-slate-900">{request.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${urgency.color}`}>{urgency.label}</span>
      </div>
      <p className="text-sm text-slate-500 line-clamp-3 mb-3">{request.description}</p>
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{request.category}</span>
        {request.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{request.city}</span>}
        {request.budget_min && <span className="flex items-center gap-1 font-medium text-[#1E40AF]"><Euro className="w-3 h-3" />{request.budget_min}€{request.budget_max ? ` - ${request.budget_max}€` : '+'}</span>}
      </div>
      <Button onClick={() => onSubmitQuote(request)} className="w-full bg-[#F97316] hover:bg-orange-600 rounded-lg text-white cursor-pointer">Faire un devis</Button>
    </div>
  )
}
