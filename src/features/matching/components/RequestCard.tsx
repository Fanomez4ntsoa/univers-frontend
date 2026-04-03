import { Link } from 'react-router-dom'
import { MapPin, Briefcase, FileText } from 'lucide-react'
import type { ProjectRequest } from '../types/matching'
import { URGENCY_CONFIG, STATUS_CONFIG } from '../types/matching'

interface RequestCardProps { request: ProjectRequest }

export default function RequestCard({ request }: RequestCardProps) {
  const urgency = URGENCY_CONFIG[request.urgency]
  const status = STATUS_CONFIG[request.status]

  return (
    <Link to={`/matching/requests/${request.id}`} className="block">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-slate-900">{request.title}</h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${urgency.color}`}>{urgency.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
          </div>
        </div>
        <p className="text-sm text-slate-500 line-clamp-2">{request.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-3">
          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{request.category}</span>
          {request.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{request.city}</span>}
          {request.budget_min && <span className="font-medium text-[#1E40AF]">{request.budget_min}€{request.budget_max ? ` - ${request.budget_max}€` : '+'}</span>}
          <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{request.quotes_count} devis reçus</span>
        </div>
      </div>
    </Link>
  )
}
