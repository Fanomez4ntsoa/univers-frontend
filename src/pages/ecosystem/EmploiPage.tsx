// EmploiPage.tsx — Orchestration pure (max 50 lignes)
// Fidèle à Emergent JobsPage.jsx — split-view Indeed style

import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import { useJobs } from '../../features/ecosystem/jobs/hooks/useJobs'
import JobListCard from '../../features/ecosystem/emploi/components/JobListCard'
import JobDetailPanel from '../../features/ecosystem/emploi/components/JobDetailPanel'
import EmploiFilters from '../../features/ecosystem/emploi/components/EmploiFilters'
import ConversionBannerEmploi from '../../features/ecosystem/emploi/components/ConversionBannerEmploi'
import BetaBanner from '../../shared/components/BetaBanner'
import type { Job } from '../../features/ecosystem/emploi/components/JobListCard'

export default function EmploiPage() {
  const [contractType, setContractType] = useState('')
  const [city, setCity] = useState('')
  const [metier, setMetier] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const { data: jobs = [], isLoading } = useJobs()

  const filtered = (jobs as unknown as Job[]).filter((j) => {
    if (contractType && j.contract_type !== contractType) return false
    if (city && j.city !== city) return false
    if (metier && j.category !== metier) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#F8FAFC]" data-testid="jobs-page">
      <EmploiFilters contractType={contractType} city={city} metier={metier} onContractTypeChange={setContractType} onCityChange={setCity} onMetierChange={setMetier} resultCount={filtered.length} />
      <ConversionBannerEmploi />

      <main className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Liste gauche */}
          <div className="w-full lg:w-[420px] xl:w-[480px] flex-shrink-0">
            <div className="px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-200">
              <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">{filtered.length}</span> offres d'emploi</p>
            </div>
            <div className="px-4 pt-4"><BetaBanner /></div>
            <div className="p-4 space-y-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-4 border-[#2557a7]/20 border-t-[#2557a7] rounded-full animate-spin" /></div>
              ) : filtered.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center">
                  <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Aucune offre trouvée</h3>
                  <p className="text-gray-500">Modifie tes critères de recherche</p>
                </div>
              ) : (
                filtered.map((job) => <JobListCard key={job.id} job={job} isSelected={selectedJob?.id === job.id} onClick={() => setSelectedJob(job)} />)
              )}
            </div>
          </div>
          {/* Detail droite — desktop */}
          <div className="hidden lg:block flex-1 sticky top-[180px] h-[calc(100vh-180px)] bg-white border-l border-gray-200">
            <JobDetailPanel job={selectedJob} />
          </div>
        </div>
      </main>
    </div>
  )
}
