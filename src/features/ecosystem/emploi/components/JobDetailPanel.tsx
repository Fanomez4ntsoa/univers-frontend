// JobDetailPanel.tsx — Panel sticky desktop detail offre
// Fidèle à Emergent JobDetailPanel

import { Briefcase, MapPin, Euro, Send, Share2 } from 'lucide-react'
import type { Job } from './JobListCard'

const JOB_TYPE_LABELS: Record<string, string> = {
  cdi: 'CDI', cdd: 'CDD', interim: 'Intérim', apprentissage: 'Apprentissage', stage: 'Stage', freelance: 'Freelance',
}

export default function JobDetailPanel({ job }: { job: Job | null }) {
  if (!job) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
        <Briefcase size={48} className="mb-4 text-gray-300" />
        <p className="text-lg font-medium text-gray-500">Sélectionne une offre</p>
        <p className="text-sm text-gray-400 mt-1">Clique sur une offre à gauche pour voir les détails</p>
      </div>
    )
  }

  const salary = job.salary_min && job.salary_max
    ? `${parseFloat(job.salary_min).toFixed(0)}€ - ${parseFloat(job.salary_max).toFixed(0)}€ /mois`
    : job.salary_min ? `À partir de ${parseFloat(job.salary_min).toFixed(0)}€` : null

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
        <p className="text-lg text-gray-700 font-medium mb-1">{job.company_name || job.user?.display_name || 'Entreprise'}</p>

        <div className="flex items-center gap-4 text-gray-500 mb-4">
          <span className="flex items-center gap-1"><MapPin size={16} />{job.city || 'France'}</span>
          {job.contract_type && <span className="flex items-center gap-1"><Briefcase size={16} />{JOB_TYPE_LABELS[job.contract_type] || job.contract_type}</span>}
        </div>

        {salary && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-lg">
              <Euro size={18} />{salary}
            </span>
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <button className="flex-1 py-3 bg-[#2557a7] hover:bg-[#1a4a8f] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
            <Send size={18} />Postuler
          </button>
          <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Share2 size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-bold text-gray-900 mb-3">Description du poste</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
        </div>

        {job.experience_level && (
          <div className="mt-6">
            <h3 className="font-bold text-gray-900 mb-2">Expérience requise</h3>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">{job.experience_level}</span>
          </div>
        )}
      </div>
    </div>
  )
}
