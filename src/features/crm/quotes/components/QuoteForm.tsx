import { useState, useEffect, type FormEvent } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateQuote, useUpdateQuote } from '../hooks/useQuotes'
import { useClients } from '../../clients/hooks/useClients'
import type { Quote } from '../../../../shared/types/crm'
import type { QuoteItemForm } from '../types/quote'
import type { AxiosError } from 'axios'

interface QuoteFormProps {
  open: boolean
  onClose: () => void
  quote?: Quote | null
}

const emptyItem: QuoteItemForm = { description: '', quantity: 1, unit: 'u', unit_price: 0, discount_amount: 0 }

function calcLine(item: QuoteItemForm) {
  const sub = item.quantity * item.unit_price
  return sub - item.discount_amount
}

function formatCurrency(v: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(v)
}

export default function QuoteForm({ open, onClose, quote }: QuoteFormProps) {
  const isEdit = !!quote
  const { data: clients } = useClients()
  const createMutation = useCreateQuote()
  const updateMutation = useUpdateQuote()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [clientId, setClientId] = useState<number | ''>('')
  const [title, setTitle] = useState('')
  const [items, setItems] = useState<QuoteItemForm[]>([{ ...emptyItem }])
  const [notes, setNotes] = useState('')
  const [validDays, setValidDays] = useState(30)

  useEffect(() => {
    if (quote) {
      setClientId(quote.client_id)
      setTitle(quote.title)
      setItems(quote.items.map((i) => ({
        description: i.description, quantity: i.quantity, unit: i.unit,
        unit_price: i.unit_price, discount_amount: i.discount_amount,
      })))
      setNotes(quote.notes ?? '')
      const diff = Math.ceil((new Date(quote.valid_until).getTime() - new Date(quote.created_at).getTime()) / 86400000)
      setValidDays(diff > 0 ? diff : 30)
    } else {
      setClientId(''); setTitle(''); setItems([{ ...emptyItem }]); setNotes(''); setValidDays(30)
    }
  }, [quote, open])

  const subtotal = items.reduce((s, i) => s + calcLine(i), 0)
  const tvaAmount = subtotal * 0.2
  const total = subtotal + tvaAmount

  const updateItem = (idx: number, field: keyof QuoteItemForm, value: string | number) => {
    setItems((prev) => prev.map((it, i) => i === idx ? { ...it, [field]: value } : it))
  }

  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }])
  const removeItem = (idx: number) => { if (items.length > 1) setItems((prev) => prev.filter((_, i) => i !== idx)) }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!clientId) { toast.error('Sélectionne un client'); return }
    if (!title.trim()) { toast.error('Le titre est obligatoire'); return }
    if (items.some((i) => !i.description.trim())) { toast.error('Chaque ligne doit avoir une description'); return }

    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + validDays)

    const payload = {
      client_id: clientId,
      title,
      items: items.map((i) => ({
        ...i,
        subtotal: i.quantity * i.unit_price - i.discount_amount,
        tva_amount: (i.quantity * i.unit_price - i.discount_amount) * 0.2,
        total: (i.quantity * i.unit_price - i.discount_amount) * 1.2,
      })),
      notes: notes || null,
      valid_until: validUntil.toISOString().split('T')[0],
    }

    const onError = (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>
      toast.error(axiosError.response?.data?.message ?? 'Une erreur est survenue')
    }

    if (isEdit) {
      updateMutation.mutate({ id: quote.id, ...payload }, {
        onSuccess: () => { toast.success('Devis mis à jour'); onClose() }, onError,
      })
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => { toast.success('Devis créé'); onClose() }, onError,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Modifier le devis' : 'Nouveau devis'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Client + Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Client *</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value ? Number(e.target.value) : '')}
                className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              >
                <option value="">Sélectionner un client</option>
                {clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Rénovation salle de bain" className="h-11 rounded-xl" />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Lignes du devis</label>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-4">
                    {idx === 0 && <span className="text-xs text-slate-500">Description</span>}
                    <Input value={item.description} onChange={(e) => updateItem(idx, 'description', e.target.value)} placeholder="Description" className="h-10 rounded-lg text-sm" />
                  </div>
                  <div className="col-span-1">
                    {idx === 0 && <span className="text-xs text-slate-500">Qté</span>}
                    <Input type="number" min={1} value={item.quantity} onChange={(e) => updateItem(idx, 'quantity', Number(e.target.value))} className="h-10 rounded-lg text-sm" />
                  </div>
                  <div className="col-span-2">
                    {idx === 0 && <span className="text-xs text-slate-500">Unité</span>}
                    <select value={item.unit} onChange={(e) => updateItem(idx, 'unit', e.target.value)} className="w-full h-10 px-2 bg-white border border-slate-200 rounded-lg text-sm">
                      <option value="u">Unité</option><option value="m²">m²</option><option value="m">m</option>
                      <option value="h">Heure</option><option value="j">Jour</option><option value="forfait">Forfait</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    {idx === 0 && <span className="text-xs text-slate-500">Prix unit. €</span>}
                    <Input type="number" min={0} step={0.01} value={item.unit_price} onChange={(e) => updateItem(idx, 'unit_price', Number(e.target.value))} className="h-10 rounded-lg text-sm" />
                  </div>
                  <div className="col-span-2">
                    {idx === 0 && <span className="text-xs text-slate-500">Remise €</span>}
                    <Input type="number" min={0} step={0.01} value={item.discount_amount} onChange={(e) => updateItem(idx, 'discount_amount', Number(e.target.value))} className="h-10 rounded-lg text-sm" />
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeItem(idx)} disabled={items.length === 1} className="text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addItem} className="mt-2 rounded-lg">
              <Plus className="w-4 h-4 mr-1" /> Ajouter une ligne
            </Button>
          </div>

          {/* Totals */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-600">Sous-total HT</span><span className="font-medium">{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">TVA (20%)</span><span className="font-medium">{formatCurrency(tvaAmount)}</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-2"><span className="font-semibold text-slate-900">Total TTC</span><span className="font-bold text-lg text-[#1E40AF]">{formatCurrency(total)}</span></div>
          </div>

          {/* Notes + Validity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Conditions particulières..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Validité (jours)</label>
              <Input type="number" min={1} value={validDays} onChange={(e) => setValidDays(Number(e.target.value))} className="h-11 rounded-xl" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              {isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Créer le devis'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
