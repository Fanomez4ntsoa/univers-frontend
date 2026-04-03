import { Link } from 'react-router-dom'
import { MapPin, Briefcase, Eye, Users, Wifi } from 'lucide-react'
import type { Job } from '../types/job'
import { CONTRACT_TYPE_CONFIG, EXPERIENCE_LEVEL_CONFIG } from '../types/job'

interface JobCardProps { job: Job }

export default function JobCard({ job }: JobCardProps) {
  const contract = CONTRACT_TYPE_CONFIG[job.contract_type]
  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-slate-900">{job.title}</h3>
            <p className="text-sm text-slate-500">{job.company_name}</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${contract.color}`}>{contract.label}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-3">
          {job.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.city}</span>}
          {job.is_remote && <span className="flex items-center gap-1 text-[#10B981]"><Wifi className="w-3 h-3" />Télétravail</span>}
          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{EXPERIENCE_LEVEL_CONFIG[job.experience_level]}</span>
          {job.salary_min && <span className="font-medium text-[#1E40AF]">{job.salary_min}€{job.salary_max ? ` - ${job.salary_max}€` : '+'}</span>}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{job.applications_count} candidatures</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{job.views_count} vues</span>
        </div>
      </div>
    </Link>
  )
}
