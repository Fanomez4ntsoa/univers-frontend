import { Link } from 'react-router-dom'
import { MapPin, Briefcase, FileText, Edit, Trash2 } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import type { ProjectRequest } from '../types/matching'
import { URGENCY_CONFIG, STATUS_CONFIG } from '../types/matching'

interface RequestCardProps {
  request: ProjectRequest
  onEdit: (request: ProjectRequest) => void
  onDelete: (id: number) => void
}

export default function RequestCard({ request, onEdit, onDelete }: RequestCardProps) {
  const urgency = URGENCY_CONFIG[request.urgency]
  const status = STATUS_CONFIG[request.status]
  const isOpen = request.status === 'open'

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-start justify-between mb-2">
        <Link to={`/matching/requests/${request.id}`} className="hover:underline">
          <h3 className="font-semibold text-slate-900">{request.title}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${urgency.color}`}>{urgency.label}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
        </div>
      </div>
      <p className="text-sm text-slate-500 line-clamp-2">{request.description}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{request.category}</span>
          {request.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{request.city}</span>}
          {request.budget_min && <span className="font-medium text-[#1E40AF]">{request.budget_min}€{request.budget_max ? ` - ${request.budget_max}€` : '+'}</span>}
          <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{request.quotes_count} devis reçus</span>
        </div>
        {isOpen && (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" onClick={() => onEdit(request)} title="Modifier"><Edit className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon-sm" onClick={() => onDelete(request.id)} title="Supprimer" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
          </div>
        )}
      </div>
    </div>
  )
}
