import { useState, useEffect, type FormEvent } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../shared/ui/dialog'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useCreateInvoice, useUpdateInvoice } from '../hooks/useInvoices'
import { useClients } from '../../clients/hooks/useClients'
import type { Invoice } from '../../../../shared/types/crm'
import type { AxiosError } from 'axios'

interface InvoiceFormProps {
  open: boolean
  onClose: () => void
  invoice?: Invoice | null
}

interface ItemForm { description: string; quantity: number; unit: string; unit_price: number; discount_amount: number }

const emptyItem: ItemForm = { description: '', quantity: 1, unit: 'u', unit_price: 0, discount_amount: 0 }

function calcLine(i: ItemForm) { return i.quantity * i.unit_price - i.discount_amount }
function fmt(v: number) { return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(v) }

export default function InvoiceForm({ open, onClose, invoice }: InvoiceFormProps) {
  const isEdit = !!invoice
  const { data: clients } = useClients()
  const createMutation = useCreateInvoice()
  const updateMutation = useUpdateInvoice()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [clientId, setClientId] = useState<number | ''>('')
  const [items, setItems] = useState<ItemForm[]>([{ ...emptyItem }])
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (invoice) {
      setClientId(invoice.client_id)
      setItems(invoice.items.map((i) => ({ description: i.description, quantity: i.quantity, unit: i.unit, unit_price: i.unit_price, discount_amount: i.discount_amount })))
      setDueDate(invoice.due_date ?? '')
      setNotes('')
    } else {
      setClientId(''); setItems([{ ...emptyItem }]); setDueDate(''); setNotes('')
    }
  }, [invoice, open])

  const subtotal = items.reduce((s, i) => s + calcLine(i), 0)
  const tva = subtotal * 0.2
  const total = subtotal + tva

  const updateItem = (idx: number, field: keyof ItemForm, value: string | number) => {
    setItems((prev) => prev.map((it, i) => i === idx ? { ...it, [field]: value } : it))
  }
  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }])
  const removeItem = (idx: number) => { if (items.length > 1) setItems((prev) => prev.filter((_, i) => i !== idx)) }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!clientId) { toast.error('Sélectionne un client'); return }
    if (items.some((i) => !i.description.trim())) { toast.error('Chaque ligne doit avoir une description'); return }

    const payload = {
      client_id: clientId,
      items: items.map((i) => ({ ...i, subtotal: calcLine(i), tva_amount: calcLine(i) * 0.2, total: calcLine(i) * 1.2 })),
      due_date: dueDate || null,
      notes: notes || null,
    }

    const onError = (error: Error) => {
      const axiosError = error as AxiosError<{ message?: string }>
      toast.error(axiosError.response?.data?.message ?? 'Une erreur est survenue')
    }

    if (isEdit) {
      updateMutation.mutate({ id: invoice.id, ...payload }, { onSuccess: () => { toast.success('Facture mise à jour'); onClose() }, onError })
    } else {
      createMutation.mutate(payload, { onSuccess: () => { toast.success('Facture créée'); onClose() }, onError })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{isEdit ? 'Modifier la facture' : 'Nouvelle facture'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Client *</label>
              <select value={clientId} onChange={(e) => setClientId(e.target.value ? Number(e.target.value) : '')} className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
                <option value="">Sélectionner un client</option>
                {clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date d'échéance</label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="h-11 rounded-xl" />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Lignes de facture</label>
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
                    <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeItem(idx)} disabled={items.length === 1} className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addItem} className="mt-2 rounded-lg"><Plus className="w-4 h-4 mr-1" /> Ajouter une ligne</Button>
          </div>

          {/* Totals */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-600">Sous-total HT</span><span className="font-medium">{fmt(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">TVA (20%)</span><span className="font-medium">{fmt(tva)}</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-2"><span className="font-semibold text-slate-900">Total TTC</span><span className="font-bold text-lg text-[#1E40AF]">{fmt(total)}</span></div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button type="submit" disabled={isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              {isPending ? 'En cours...' : isEdit ? 'Mettre à jour' : 'Créer la facture'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
