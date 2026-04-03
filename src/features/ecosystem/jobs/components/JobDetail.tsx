import { useState } from 'react'
import { ArrowLeft, MapPin, Briefcase, Eye, Users, Wifi, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'
import { requireAuth } from '../../../../shared/lib/requireAuth'
import { useJob, useJobApplications } from '../hooks/useJobs'
import { CONTRACT_TYPE_CONFIG, EXPERIENCE_LEVEL_CONFIG } from '../types/job'
import { getStoredUser } from '../../../auth/hooks/useAuth'
import ApplyModal from './ApplyModal'
import PageSkeleton from '../../../../shared/components/PageSkeleton'

interface JobDetailProps { jobId: number }

function fmtDate(d: string) { return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }

export default function JobDetail({ jobId }: JobDetailProps) {
  const { data: job, isLoading } = useJob(jobId)
  const currentUser = getStoredUser()
  const isOwner = currentUser?.id === String(job?.user_id)
  const { data: applications } = useJobApplications(isOwner ? jobId : null)
  const [applyOpen, setApplyOpen] = useState(false)

  if (isLoading || !job) return <PageSkeleton />
  const contract = CONTRACT_TYPE_CONFIG[job.contract_type]

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/jobs"><Button variant="ghost" size="icon" className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <div className="flex-1">
          <div className="flex items-center gap-3"><h1 className="text-2xl font-bold text-slate-900">{job.title}</h1><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${contract.color}`}>{contract.label}</span></div>
          <p className="text-slate-500 text-sm">{job.company_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Description</h2>
          <p className="text-sm text-slate-600 whitespace-pre-wrap">{job.description}</p>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            {job.city && <p className="flex items-center gap-2 text-sm text-slate-600"><MapPin className="w-4 h-4" />{job.city}</p>}
            {job.is_remote && <p className="flex items-center gap-2 text-sm text-[#10B981]"><Wifi className="w-4 h-4" />Télétravail</p>}
            <p className="flex items-center gap-2 text-sm text-slate-600"><Briefcase className="w-4 h-4" />{EXPERIENCE_LEVEL_CONFIG[job.experience_level]}</p>
            {job.salary_min && <p className="text-sm font-medium text-[#1E40AF]">{job.salary_min}€{job.salary_max ? ` - ${job.salary_max}€` : '+'}</p>}
            <p className="flex items-center gap-2 text-sm text-slate-400"><Eye className="w-4 h-4" />{job.views_count} vues</p>
            <p className="flex items-center gap-2 text-sm text-slate-400"><Users className="w-4 h-4" />{job.applications_count} candidatures</p>
            {job.expires_at && <p className="flex items-center gap-2 text-sm text-slate-400"><Calendar className="w-4 h-4" />Expire le {fmtDate(job.expires_at)}</p>}
          </div>
          {!isOwner && (
            <Button onClick={() => requireAuth(() => setApplyOpen(true))} disabled={job.has_applied} className="w-full bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              {job.has_applied ? 'Déjà postulé' : 'Postuler'}
            </Button>
          )}
        </div>
      </div>

      {isOwner && (applications ?? []).length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Candidatures ({(applications ?? []).length})</h2>
          <div className="space-y-3">
            {(applications ?? []).map((a) => (
              <div key={a.id} className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1"><span className="font-medium text-sm text-slate-900">{a.user.display_name}</span><span className="text-xs text-slate-400">{a.email}</span></div>
                <p className="text-sm text-slate-600">{a.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} jobId={job.id} jobTitle={job.title} />
    </div>
  )
}
