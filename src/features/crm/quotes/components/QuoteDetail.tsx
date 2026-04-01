import { ArrowLeft, CheckCircle, Calendar } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { useQuote } from '../hooks/useQuotes'
import { STATUS_CONFIG } from '../types/quote'
import PageSkeleton from '../../../../shared/components/PageSkeleton'

interface QuoteDetailProps {
  quoteId: number
  onBack: () => void
  onEdit: () => void
  onSend: (id: number) => void
  onSign: () => void
  onDuplicate: (id: number) => void
  onConvertInvoice: (id: number) => void
  onDelete: (id: number) => void
}

function formatCurrency(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function QuoteDetail({
  quoteId, onBack, onEdit, onSend, onSign, onDuplicate, onConvertInvoice, onDelete,
}: QuoteDetailProps) {
  const { data: quote, isLoading } = useQuote(quoteId)
  if (isLoading || !quote) return <PageSkeleton />

  const status = STATUS_CONFIG[quote.status]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{quote.quote_number}</h1>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>{status.label}</span>
          </div>
          <p className="text-slate-500 text-sm">{quote.title} — {quote.client?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Informations</h3>
            <p className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="w-4 h-4" /> Créé le {formatDate(quote.created_at)}</p>
            <p className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="w-4 h-4" /> Valide jusqu'au {formatDate(quote.valid_until)}</p>
            {quote.notes && <p className="text-sm text-slate-600 pt-2 border-t border-slate-100">{quote.notes}</p>}
          </div>

          {quote.signed && (
            <div className="bg-green-50 rounded-xl border border-green-200 p-4">
              <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
                <CheckCircle className="w-4 h-4" /> Devis signé
              </div>
              {quote.signed_by && <p className="text-sm text-green-600 mt-1">Par {quote.signed_by}</p>}
              {quote.signature_url && <img src={quote.signature_url} alt="Signature" className="mt-2 max-h-20 border rounded" />}
            </div>
          )}

          {/* Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Actions</h3>
            {quote.status === 'draft' && (
              <>
                <Button onClick={() => onSend(quote.id)} className="w-full bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">Envoyer</Button>
                <Button variant="outline" onClick={() => onEdit()} className="w-full rounded-lg">Modifier</Button>
                <Button variant="outline" onClick={() => onDelete(quote.id)} className="w-full rounded-lg text-red-500 hover:text-red-600">Supprimer</Button>
              </>
            )}
            {quote.status === 'sent' && (
              <>
                <Button onClick={() => onSign()} className="w-full bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">Signer</Button>
                <Button variant="outline" onClick={() => onDuplicate(quote.id)} className="w-full rounded-lg">Dupliquer</Button>
              </>
            )}
            {quote.status === 'accepted' && (
              <>
                <Button onClick={() => onConvertInvoice(quote.id)} className="w-full bg-[#F97316] hover:bg-orange-600 rounded-lg text-white cursor-pointer">Convertir en facture</Button>
                <Button variant="outline" onClick={() => onDuplicate(quote.id)} className="w-full rounded-lg">Dupliquer</Button>
              </>
            )}
            {(quote.status === 'invoiced' || quote.status === 'refused' || quote.status === 'expired') && (
              <Button variant="outline" onClick={() => onDuplicate(quote.id)} className="w-full rounded-lg">Dupliquer</Button>
            )}
          </div>
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
                {quote.items.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900">{item.description}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{item.quantity}</td>
                    <td className="px-4 py-3 text-slate-600">{item.unit}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(item.unit_price)}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(item.discount_amount)}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Totals */}
            <div className="border-t border-slate-200 p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-600">Sous-total HT</span><span>{formatCurrency(quote.subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-600">TVA</span><span>{formatCurrency(quote.tax_amount)}</span></div>
              <div className="flex justify-between text-base font-bold border-t border-slate-200 pt-2"><span>Total TTC</span><span className="text-[#1E40AF]">{formatCurrency(quote.total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
