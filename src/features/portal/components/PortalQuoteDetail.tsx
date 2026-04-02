import { useState } from 'react'
import { ArrowLeft, CheckCircle, Calendar, PenTool } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../shared/ui/button'
import type { PortalQuote } from '../types/portal'
import PortalSignatureModal from './PortalSignatureModal'

interface PortalQuoteDetailProps {
  quote: PortalQuote
  token: string
}

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0)
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function PortalQuoteDetail({ quote, token }: PortalQuoteDetailProps) {
  const [signOpen, setSignOpen] = useState(false)
  if (!quote) return null
  const canSign = (quote.status ?? '') === 'sent' && !quote.signed

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={`/portal/${token}`}>
          <Button variant="ghost" size="icon" className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{quote.quote_number ?? ''}</h1>
          <p className="text-slate-500 text-sm">{quote.title ?? ''}</p>
          {quote.company_name && <p className="text-sm text-[#1E40AF] font-medium">{quote.company_name}</p>}
        </div>
      </div>

      {/* Signed status */}
      {quote.signed && (
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
            <CheckCircle className="w-4 h-4" /> Devis signé
          </div>
          {quote.signed_by && <p className="text-sm text-green-600 mt-1">Par {quote.signed_by}</p>}
          {quote.signature_url && <img src={quote.signature_url} alt="Signature" className="mt-2 max-h-20 border rounded" />}
        </div>
      )}

      {/* Validity */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex items-center gap-2 text-sm text-amber-700">
        <Calendar className="w-4 h-4" /> Valide jusqu'au {quote.valid_until ? fmtDate(quote.valid_until) : '—'}
      </div>

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
            {(quote.items ?? []).map((item, i) => (
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
          <div className="flex justify-between text-sm"><span className="text-slate-600">Sous-total HT</span><span>{fmt(quote.subtotal ?? '0')}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-600">TVA</span><span>{fmt(quote.tax_amount ?? '0')}</span></div>
          <div className="flex justify-between text-base font-bold border-t border-slate-200 pt-2"><span>Total TTC</span><span className="text-[#1E40AF]">{fmt(quote.total ?? '0')}</span></div>
        </div>
      </div>

      {/* Notes */}
      {quote.notes && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Notes</h3>
          <p className="text-sm text-slate-600">{quote.notes}</p>
        </div>
      )}

      {/* CGV */}
      {quote.cgv_text && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Conditions générales de vente</h3>
          <div className="text-xs text-slate-500 max-h-40 overflow-y-auto whitespace-pre-wrap">{quote.cgv_text}</div>
        </div>
      )}

      {/* Sign button */}
      {canSign && (
        <div className="bg-[#1E40AF]/5 rounded-xl border border-[#1E40AF]/20 p-6 text-center">
          <PenTool className="w-8 h-8 text-[#1E40AF] mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Signer ce devis</h3>
          <p className="text-sm text-slate-500 mb-4">En signant, tu acceptes les conditions ci-dessus</p>
          <Button onClick={() => setSignOpen(true)} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer h-11 px-8">
            Signer le devis
          </Button>
        </div>
      )}

      <PortalSignatureModal open={signOpen} onClose={() => setSignOpen(false)} token={token} quoteId={quote.id} />
    </div>
  )
}
