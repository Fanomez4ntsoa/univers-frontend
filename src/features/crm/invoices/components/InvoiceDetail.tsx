import { ArrowLeft, Calendar, CheckCircle, FileText, CreditCard } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { useInvoice } from '../hooks/useInvoices'
import { STATUS_CONFIG, getPaymentColor } from '../types/invoice'
import PageSkeleton from '../../../../shared/components/PageSkeleton'

interface InvoiceDetailProps {
  invoiceId: number
  onBack: () => void
  onEdit: () => void
  onSend: (id: number) => void
  onMarkPaid: () => void
  onCancel: (id: number) => void
  onDelete: (id: number) => void
}

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0)
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function InvoiceDetail({ invoiceId, onBack, onEdit, onSend, onMarkPaid, onCancel, onDelete }: InvoiceDetailProps) {
  const { data: invoice, isLoading } = useInvoice(invoiceId)
  if (isLoading || !invoice) return <PageSkeleton />

  const status = STATUS_CONFIG[invoice.status]
  const payColor = getPaymentColor(invoice.amount_paid, invoice.total)
  const isReadonly = invoice.status === 'paid' || invoice.status === 'cancelled'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{invoice.invoice_number}</h1>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>{status.label}</span>
          </div>
          <p className="text-slate-500 text-sm">{invoice.client?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Info + Actions */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className={`text-xl font-bold ${payColor}`}>{fmt(invoice.amount_paid)}</p>
              <p className="text-xs text-slate-500 mt-1">Payé</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className={`text-xl font-bold ${parseFloat(invoice.amount_due) > 0 ? 'text-red-500' : 'text-slate-400'}`}>{fmt(invoice.amount_due)}</p>
              <p className="text-xs text-slate-500 mt-1">Reste dû</p>
            </div>
          </div>

          {/* Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Informations</h3>
            <p className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="w-4 h-4" /> Créée le {fmtDate(invoice.created_at)}</p>
            {invoice.due_date && <p className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="w-4 h-4" /> Échéance : {fmtDate(invoice.due_date)}</p>}
            {invoice.quote && (
              <p className="flex items-center gap-2 text-sm text-slate-600"><FileText className="w-4 h-4" /> Devis lié : {invoice.quote.quote_number}</p>
            )}
          </div>

          {/* Payment info for paid invoices */}
          {invoice.status === 'paid' && (
            <div className="bg-green-50 rounded-xl border border-green-200 p-4">
              <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
                <CheckCircle className="w-4 h-4" /> Facture payée
              </div>
              {invoice.payment_date && <p className="text-sm text-green-600 mt-1"><CreditCard className="w-3 h-3 inline mr-1" />Payée le {fmtDate(invoice.payment_date)}</p>}
            </div>
          )}

          {/* Actions */}
          {!isReadonly && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Actions</h3>
              {invoice.status === 'draft' && (
                <>
                  <Button onClick={() => onSend(invoice.id)} className="w-full bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">Envoyer</Button>
                  <Button variant="outline" onClick={onEdit} className="w-full rounded-lg">Modifier</Button>
                  <Button variant="outline" onClick={() => onDelete(invoice.id)} className="w-full rounded-lg text-red-500 hover:text-red-600">Supprimer</Button>
                </>
              )}
              {(invoice.status === 'sent' || invoice.status === 'pending' || invoice.status === 'overdue') && (
                <>
                  <Button onClick={onMarkPaid} className="w-full bg-[#10B981] hover:bg-emerald-600 rounded-lg text-white cursor-pointer">Marquer payée</Button>
                  <Button variant="outline" onClick={() => onCancel(invoice.id)} className="w-full rounded-lg text-red-500 hover:text-red-600">Annuler</Button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right — Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Description</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Qté</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Unité</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">P.U.</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Remise</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900">{item.description}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{item.quantity}</td>
                    <td className="px-4 py-3 text-slate-600">{item.unit}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{fmt(item.unit_price)}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{fmt(item.discount_amount)}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900">{fmt(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-slate-200 p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-600">Sous-total HT</span><span>{fmt(invoice.subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-600">TVA</span><span>{fmt(invoice.tax_amount)}</span></div>
              <div className="flex justify-between text-base font-bold border-t border-slate-200 pt-2"><span>Total TTC</span><span className="text-[#1E40AF]">{fmt(invoice.total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
