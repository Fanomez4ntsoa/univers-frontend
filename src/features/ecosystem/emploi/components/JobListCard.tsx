// JobListCard.tsx — Fidèle à Emergent JobListCard
// Card compacte style Indeed : titre, entreprise, ville, badge contrat, salaire, date

import { motion } from 'framer-motion'
import { MapPin, Euro, Briefcase, BookmarkPlus, Info } from 'lucide-react'
import { IS_DEMO } from '../../../../shared/lib/config'

const JOB_TYPE_COLORS: Record<string, string> = {
  cdi: 'bg-emerald-100 text-emerald-700',
  cdd: 'bg-blue-100 text-blue-700',
  interim: 'bg-orange-100 text-orange-700',
  apprentissage: 'bg-purple-100 text-purple-700',
  stage: 'bg-pink-100 text-pink-700',
  freelance: 'bg-cyan-100 text-cyan-700',
}

const JOB_TYPE_LABELS: Record<string, string> = {
  cdi: 'CDI', cdd: 'CDD', interim: 'Intérim', apprentissage: 'Apprentissage', stage: 'Stage', freelance: 'Freelance',
}

function formatRelativeDate(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Aujourd'hui"
  if (days === 1) return 'Hier'
  if (days < 7) return `Il y a ${days}j`
  return `Il y a ${Math.floor(days / 7)} sem.`
}

interface Job {
  id: number
  title: string
  company_name: string | null
  city: string | null
  contract_type: string | null
  salary_min: string | null
  salary_max: string | null
  description: string | null
  category: string | null
  experience_level: string | null
  created_at: string
  user?: { display_name: string }
}

export default function JobListCard({ job, isSelected, onClick }: { job: Job; isSelected: boolean; onClick: () => void }) {
  const typeColor = JOB_TYPE_COLORS[job.contract_type || ''] || 'bg-gray-100 text-gray-700'
  const typeLabel = JOB_TYPE_LABELS[job.contract_type || ''] || job.contract_type

  const salary = job.salary_min && job.salary_max
    ? `${parseFloat(job.salary_min).toFixed(0)}€ - ${parseFloat(job.salary_max).toFixed(0)}€ /mois`
    : job.salary_min ? `À partir de ${parseFloat(job.salary_min).toFixed(0)}€` : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`relative bg-white rounded-xl border-2 p-4 cursor-pointer transition-all ${isSelected ? 'border-[#2557a7] shadow-lg' : 'border-transparent hover:border-gray-200 hover:shadow-md'}`}
      style={{ boxShadow: isSelected ? '0 4px 20px rgba(37,87,167,0.15)' : undefined }}
    >
      {IS_DEMO && (
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
          <Info size={10} />TEST
        </div>
      )}

      <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 hover:text-[#2557a7]">{job.title}</h3>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-700 font-medium">{job.company_name || job.user?.display_name || 'Entreprise'}</span>
      </div>

      <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
        <MapPin size={14} />
        <span>{job.city || 'France'}</span>
      </div>

      {salary && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg font-semibold text-sm">
            <Euro size={14} />{salary}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {typeLabel && <span className={`px-2 py-1 rounded text-xs font-medium ${typeColor}`}>{typeLabel}</span>}
        {job.category && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs flex items-center gap-1">
            <Briefcase size={12} />{job.category}
          </span>
        )}
      </div>

      {job.description && <p className="text-gray-600 text-sm line-clamp-2 mb-3">{job.description}</p>}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{formatRelativeDate(job.created_at)}</span>
        <button onClick={(e) => e.stopPropagation()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <BookmarkPlus size={18} className="text-gray-400" />
        </button>
      </div>

      {isSelected && <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#2557a7] rounded-r" />}
    </motion.div>
  )
}

export type { Job }
