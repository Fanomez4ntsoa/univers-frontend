import { useState, type FormEvent } from 'react'
import { ArrowLeft, Calendar, MapPin, FileText, Upload, Trash2, Send, Clock, Euro } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../shared/ui/tabs'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useChantier, useAddDocument, useDeleteDocument, useAddComment, useAddTimeEntry, useAddCost } from '../hooks/useChantiers'
import { STATUS_CONFIG, TYPE_CONFIG } from '../types/chantier'
import RentabiliteIndicator from './RentabiliteIndicator'
import PageSkeleton from '../../../../shared/components/PageSkeleton'

interface ChantierDetailProps {
  chantierId: number
  onBack: () => void
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n || 0)
}

export default function ChantierDetail({ chantierId, onBack }: ChantierDetailProps) {
  const { data: chantier, isLoading } = useChantier(chantierId)
  if (isLoading || !chantier) return <PageSkeleton />

  const status = STATUS_CONFIG[chantier.status]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{chantier.client_name}</h1>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>{status.label}</span>
          </div>
          <p className="text-slate-500 text-sm">{TYPE_CONFIG[chantier.chantier_type]} {chantier.city ? `— ${chantier.city}` : ''}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Informations</h3>
            {chantier.address && <p className="flex items-center gap-2 text-sm text-slate-600"><MapPin className="w-4 h-4" />{chantier.address}, {chantier.city}</p>}
            <p className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="w-4 h-4" />Début : {fmtDate(chantier.actual_start_date)}</p>
            <p className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="w-4 h-4" />Fin : {fmtDate(chantier.actual_end_date)}</p>
            {chantier.quote_number && <p className="flex items-center gap-2 text-sm text-slate-600"><FileText className="w-4 h-4" />Devis : {chantier.quote_number}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-lg font-bold text-[#1E40AF]">{fmt(chantier.quote_amount)}</p>
              <p className="text-xs text-slate-500 mt-1">Montant devis</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-lg font-bold text-slate-700">{fmt(chantier.actual_cost ?? '0')}</p>
              <p className="text-xs text-slate-500 mt-1">Coût réel</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-lg font-bold text-slate-700">{chantier.total_hours}h</p>
              <p className="text-xs text-slate-500 mt-1">Heures</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <RentabiliteIndicator level={chantier.rentability_level} margin={chantier.margin} />
              <p className="text-xs text-slate-500 mt-1">Rentabilité</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="comments">Commentaires</TabsTrigger>
              <TabsTrigger value="time">Temps</TabsTrigger>
              <TabsTrigger value="costs">Coûts</TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="mt-4"><DocumentsTab chantierId={chantierId} documents={chantier.documents ?? []} /></TabsContent>
            <TabsContent value="comments" className="mt-4"><CommentsTab chantierId={chantierId} comments={chantier.comments ?? []} /></TabsContent>
            <TabsContent value="time" className="mt-4"><TimeTab chantierId={chantierId} entries={chantier.time_entries ?? []} /></TabsContent>
            <TabsContent value="costs" className="mt-4"><CostsTab chantierId={chantierId} costs={chantier.costs ?? []} /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function DocumentsTab({ chantierId, documents }: { chantierId: number; documents: { id: number; name: string; file_url: string; created_at: string }[] }) {
  const addDoc = useAddDocument()
  const deleteDoc = useDeleteDocument()
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', file.name)
    addDoc.mutate({ chantierId, formData }, { onSuccess: () => toast.success('Document ajouté'), onError: () => toast.error('Erreur') })
  }
  return (
    <div className="space-y-4">
      <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white rounded-lg cursor-pointer hover:bg-blue-800 text-sm">
        <Upload className="w-4 h-4" /> Ajouter un document
        <input type="file" className="hidden" onChange={handleUpload} />
      </label>
      {documents.length === 0 ? <p className="text-sm text-slate-400 text-center py-6">Aucun document</p> : (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
              <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1E40AF] hover:underline">{doc.name}</a>
              <Button variant="ghost" size="icon-sm" onClick={() => deleteDoc.mutate({ chantierId, docId: doc.id }, { onSuccess: () => toast.success('Supprimé') })} className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CommentsTab({ chantierId, comments }: { chantierId: number; comments: { id: number; content: string; created_at: string }[] }) {
  const [content, setContent] = useState('')
  const addComment = useAddComment()
  const handleSubmit = () => {
    if (!content.trim()) return
    addComment.mutate({ chantierId, content }, { onSuccess: () => { toast.success('Commentaire ajouté'); setContent('') }, onError: () => toast.error('Erreur') })
  }
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Ajouter un commentaire..." className="h-11 rounded-xl" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
        <Button onClick={handleSubmit} disabled={!content.trim()} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer h-11 px-4"><Send className="w-4 h-4" /></Button>
      </div>
      {comments.length === 0 ? <p className="text-sm text-slate-400 text-center py-6">Aucun commentaire</p> : (
        <div className="space-y-2">
          {comments.map((c) => (
            <div key={c.id} className="bg-slate-50 rounded-lg px-4 py-3">
              <p className="text-sm text-slate-700">{c.content}</p>
              <p className="text-xs text-slate-400 mt-1">{fmtDate(c.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TimeTab({ chantierId, entries }: { chantierId: number; entries: { id: number; worker_name: string; hours: string; date: string; description: string | null }[] }) {
  const [worker, setWorker] = useState('')
  const [hours, setHours] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const addTime = useAddTimeEntry()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!worker.trim() || !hours) return
    addTime.mutate({ chantierId, worker_name: worker, hours: Number(hours), date }, { onSuccess: () => { toast.success('Entrée ajoutée'); setWorker(''); setHours('') }, onError: () => toast.error('Erreur') })
  }
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <Input value={worker} onChange={(e) => setWorker(e.target.value)} placeholder="Ouvrier" className="h-10 rounded-lg text-sm w-32" />
        <Input type="number" min={0.5} step={0.5} value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Heures" className="h-10 rounded-lg text-sm w-20" />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-lg text-sm" />
        <Button type="submit" size="sm" className="bg-[#1E40AF] text-white rounded-lg cursor-pointer"><Clock className="w-4 h-4 mr-1" />Ajouter</Button>
      </form>
      {entries.length === 0 ? <p className="text-sm text-slate-400 text-center py-6">Aucune entrée</p> : (
        <div className="space-y-2">
          {entries.map((e) => (
            <div key={e.id} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 text-sm">
              <span className="font-medium text-slate-700">{e.worker_name}</span>
              <span className="text-slate-600">{e.hours}h — {fmtDate(e.date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CostsTab({ chantierId, costs }: { chantierId: number; costs: { id: number; description: string; amount: string; category: string; date: string }[] }) {
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('materials')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const addCost = useAddCost()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!desc.trim() || !amount) return
    addCost.mutate({ chantierId, description: desc, amount: Number(amount), category, date }, { onSuccess: () => { toast.success('Coût ajouté'); setDesc(''); setAmount('') }, onError: () => toast.error('Erreur') })
  }
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="h-10 rounded-lg text-sm w-40" />
        <Input type="number" min={0} step={0.01} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="€" className="h-10 rounded-lg text-sm w-24" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 px-2 bg-white border border-slate-200 rounded-lg text-sm">
          <option value="materials">Matériaux</option><option value="tools">Outillage</option>
          <option value="transport">Transport</option><option value="other">Autre</option>
        </select>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-lg text-sm" />
        <Button type="submit" size="sm" className="bg-[#1E40AF] text-white rounded-lg cursor-pointer"><Euro className="w-4 h-4 mr-1" />Ajouter</Button>
      </form>
      {costs.length === 0 ? <p className="text-sm text-slate-400 text-center py-6">Aucun coût</p> : (
        <div className="space-y-2">
          {costs.map((c) => (
            <div key={c.id} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 text-sm">
              <div><span className="font-medium text-slate-700">{c.description}</span><span className="text-slate-400 ml-2">({c.category})</span></div>
              <span className="font-medium text-slate-900">{fmt(c.amount)} — {fmtDate(c.date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
