import { ArrowLeft, Calendar, CheckCircle, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../shared/ui/button'
import type { PortalInvoice } from '../types/portal'

interface PortalInvoiceDetailProps {
  invoice: PortalInvoice
  token: string
}

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0)
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getPaymentColor(paid: string, total: string): string {
  const p = parseFloat(paid) || 0
  const t = parseFloat(total) || 0
  if (p <= 0) return 'text-slate-400'
  if (p >= t) return 'text-[#10B981]'
  return 'text-[#F97316]'
}

export default function PortalInvoiceDetail({ invoice, token }: PortalInvoiceDetailProps) {
  const payColor = getPaymentColor(invoice.amount_paid, invoice.total)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={`/portal/${token}`}>
          <Button variant="ghost" size="icon" className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{invoice.invoice_number}</h1>
        </div>
      </div>

      {/* Payment status */}
      {invoice.status === 'paid' && (
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
            <CheckCircle className="w-4 h-4" /> Facture payée
          </div>
          {invoice.payment_date && <p className="text-sm text-green-600 mt-1"><CreditCard className="w-3 h-3 inline mr-1" />Payée le {fmtDate(invoice.payment_date)}</p>}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-xl font-bold text-[#1E40AF]">{fmt(invoice.total)}</p>
          <p className="text-xs text-slate-500 mt-1">Total TTC</p>
        </div>
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
      {invoice.due_date && (
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex items-center gap-2 text-sm text-amber-700">
          <Calendar className="w-4 h-4" /> Échéance : {fmtDate(invoice.due_date)}
        </div>
      )}

      {/* Items */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Description</th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">Qté</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Unité</th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">P.U.</th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoice.items.map((item, i) => (
              <tr key={i}>
                <td className="px-4 py-3 text-slate-900">{item.description}</td>
                <td className="px-4 py-3 text-right text-slate-600">{item.quantity}</td>
                <td className="px-4 py-3 text-slate-600">{item.unit}</td>
                <td className="px-4 py-3 text-right text-slate-600">{fmt(item.unit_price)}</td>
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
  )
}
