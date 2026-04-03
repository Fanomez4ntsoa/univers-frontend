import { useState } from 'react'
import { Briefcase, CalendarDays } from 'lucide-react'
import { useJobs } from '../../features/ecosystem/jobs/hooks/useJobs'
import { useEvents } from '../../features/ecosystem/jobs/hooks/useEvents'
import JobsList from '../../features/ecosystem/jobs/components/JobsList'
import EventsList from '../../features/ecosystem/jobs/components/EventsList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function JobsPage() {
  const [tab, setTab] = useState<'jobs' | 'events'>('jobs')
  const jobsQuery = useJobs()
  const eventsQuery = useEvents()

  const isLoading = tab === 'jobs' ? jobsQuery.isLoading : eventsQuery.isLoading
  if (isLoading) return <PageSkeleton />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Emplois & Événements</h1>
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button onClick={() => setTab('jobs')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === 'jobs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
            <Briefcase className="w-4 h-4" /> Offres
          </button>
          <button onClick={() => setTab('events')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === 'events' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
            <CalendarDays className="w-4 h-4" /> Événements
          </button>
        </div>
      </div>
      {tab === 'jobs' ? <JobsList jobs={jobsQuery.data ?? []} /> : <EventsList events={eventsQuery.data ?? []} />}
    </div>
  )
}
