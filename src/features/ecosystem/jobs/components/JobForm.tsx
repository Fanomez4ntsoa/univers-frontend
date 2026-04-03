import { useState, useEffect, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateJob, useUpdateJob } from '../hooks/useJobs'
import type { Job, ContractType, ExperienceLevel } from '../types/job'
import { CONTRACT_TYPE_CONFIG, EXPERIENCE_LEVEL_CONFIG } from '../types/job'

interface JobFormProps { open: boolean; onClose: () => void; job?: Job | null }

export default function JobForm({ open, onClose, job }: JobFormProps) {
  const isEdit = !!job
  const createMutation = useCreateJob()
  const updateMutation = useUpdateJob()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [city, setCity] = useState('')
  const [contractType, setContractType] = useState<ContractType>('cdi')
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('debutant')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [isRemote, setIsRemote] = useState(false)

  useEffect(() => {
    if (job) {
      setTitle(job.title); setDescription(job.description); setCompanyName(job.company_name)
      setCity(job.city ?? ''); setContractType(job.contract_type); setExperienceLevel(job.experience_level)
      setSalaryMin(job.salary_min ?? ''); setSalaryMax(job.salary_max ?? ''); setIsRemote(job.is_remote)
    } else {
      setTitle(''); setDescription(''); setCompanyName(''); setCity(''); setContractType('cdi')
      setExperienceLevel('debutant'); setSalaryMin(''); setSalaryMax(''); setIsRemote(false)
    }
  }, [job, open])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) { toast.error('Titre et description obligatoires'); return }
    const payload = { title, description, company_name: companyName, city: city || null, contract_type: contractType, experience_level: experienceLevel, salary_min: salaryMin || null, salary_max: salaryMax || null, is_remote: isRemote }
    if (isEdit) {
      updateMutation.mutate({ id: job.id, ...payload }, { onSuccess: () => { toast.success('Offre mise à jour'); onClose() }, onError: () => toast.error('Erreur') })
    } else {
      createMutation.mutate(payload, { onSuccess: () => { toast.success('Offre publiée'); onClose() }, onError: () => toast.error('Erreur') })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{isEdit ? "Modifier l'offre" : 'Nouvelle offre'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Plombier expérimenté" className="h-11 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Description *</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Entreprise</label><Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="h-11 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Ville</label><Input value={city} onChange={(e) => setCity(e.target.value)} className="h-11 rounded-xl" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Type de contrat</label><select value={contractType} onChange={(e) => setContractType(e.target.value as ContractType)} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm">{(Object.entries(CONTRACT_TYPE_CONFIG) as [ContractType, { label: string }][]).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Expérience</label><select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm">{(Object.entries(EXPERIENCE_LEVEL_CONFIG) as [ExperienceLevel, string][]).map(([v, label]) => <option key={v} value={v}>{label}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Salaire min (€)</label><Input type="number" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} className="h-11 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Salaire max (€)</label><Input type="number" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} className="h-11 rounded-xl" /></div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={isRemote} onChange={(e) => setIsRemote(e.target.checked)} className="rounded" /><span className="text-sm text-slate-700">Télétravail possible</span></label>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">{isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Publier'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
