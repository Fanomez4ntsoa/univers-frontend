import { Link } from 'react-router-dom'
import { FileText, Receipt, Phone, Mail, MapPin } from 'lucide-react'
import type { PortalDashboard as PortalDashboardType } from '../types/portal'

interface PortalDashboardProps {
  data: PortalDashboardType
  token: string
}

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0)
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const QUOTE_STATUS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Brouillon', color: 'bg-slate-100 text-slate-700' },
  sent: { label: 'Envoyé', color: 'bg-blue-100 text-blue-700' },
  accepted: { label: 'Accepté', color: 'bg-green-100 text-green-700' },
  refused: { label: 'Refusé', color: 'bg-red-100 text-red-700' },
  expired: { label: 'Expiré', color: 'bg-orange-100 text-orange-700' },
  invoiced: { label: 'Facturé', color: 'bg-purple-100 text-purple-700' },
}

const INVOICE_STATUS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Brouillon', color: 'bg-slate-100 text-slate-700' },
  sent: { label: 'Envoyée', color: 'bg-blue-100 text-blue-700' },
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700' },
  paid: { label: 'Payée', color: 'bg-green-100 text-green-700' },
  overdue: { label: 'En retard', color: 'bg-red-100 text-red-700' },
  cancelled: { label: 'Annulée', color: 'bg-slate-100 text-slate-500' },
}

export default function PortalDashboard({ data, token }: PortalDashboardProps) {
  const { client, quotes, invoices } = data

  return (
    <div className="space-y-8">
      {/* Client Info */}
      <div className="bg-[#1E40AF] rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Bienvenue, {client.name}</h1>
        {client.company_name && <p className="text-blue-200 text-sm mb-3">{client.company_name}</p>}
        <div className="flex flex-wrap gap-4 text-sm text-blue-100">
          {client.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{client.phone}</span>}
          {client.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{client.email}</span>}
          {client.city && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{client.city}</span>}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Devis" value={String(quotes.length)} icon={<FileText className="w-5 h-5" />} color="text-[#1E40AF]" />
        <StatCard label="À signer" value={String(quotes.filter((q) => q.status === 'sent' && !q.signed).length)} icon={<FileText className="w-5 h-5" />} color="text-[#F97316]" />
        <StatCard label="Factures" value={String(invoices.length)} icon={<Receipt className="w-5 h-5" />} color="text-[#1E40AF]" />
        <StatCard label="Payées" value={String(invoices.filter((i) => i.status === 'paid').length)} icon={<Receipt className="w-5 h-5" />} color="text-[#10B981]" />
      </div>

      {/* Quotes */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-[#1E40AF]" /> Tes devis</h2>
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {quotes.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">Aucun devis</p>
          ) : (
            quotes.map((q) => {
              const status = QUOTE_STATUS[q.status] ?? { label: q.status, color: 'bg-slate-100 text-slate-600' }
              return (
                <Link key={q.id} to={`/portal/${token}/quotes/${q.id}`} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <span className="font-medium text-slate-900">{q.quote_number}</span>
                    <p className="text-sm text-slate-500">{q.title}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">{fmt(q.total)}</span>
                    <div className="mt-1"><span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span></div>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2"><Receipt className="w-5 h-5 text-[#1E40AF]" /> Tes factures</h2>
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {invoices.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">Aucune facture</p>
          ) : (
            invoices.map((inv) => {
              const status = INVOICE_STATUS[inv.status] ?? { label: inv.status, color: 'bg-slate-100 text-slate-600' }
              return (
                <Link key={inv.id} to={`/portal/${token}/invoices/${inv.id}`} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <span className="font-medium text-slate-900">{inv.invoice_number}</span>
                    <p className="text-sm text-slate-500">Échéance : {fmtDate(inv.due_date)}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">{fmt(inv.total)}</span>
                    <div className="mt-1"><span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span></div>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
      <div className={`mx-auto mb-2 ${color}`}>{icon}</div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  )
}
