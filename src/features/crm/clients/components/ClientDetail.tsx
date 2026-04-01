import { ArrowLeft, Phone, Mail, MapPin, Building } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../shared/ui/tabs'
import { Button } from '../../../../shared/ui/button'
import { useClient } from '../hooks/useClients'
import type { Client } from '../../../../shared/types/crm'
import ClientNoteForm from './ClientNoteForm'
import PortalTokenCard from './PortalTokenCard'
import PageSkeleton from '../../../../shared/components/PageSkeleton'

interface ClientDetailProps {
  clientId: number
  onBack: () => void
}

function formatCurrency(value: string | number) {
  const num = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(num || 0)
}

export default function ClientDetail({ clientId, onBack }: ClientDetailProps) {
  const { data: client, isLoading } = useClient(clientId)

  if (isLoading || !client) return <PageSkeleton />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
          {client.company_name && (
            <p className="text-slate-500 text-sm">{client.company_name}</p>
          )}
        </div>
      </div>

      {/* Stats + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Contact + Portal */}
        <div className="space-y-4">
          <InfoCard client={client} />
          <PortalTokenCard clientId={client.id} token={client.portal_token} />
        </div>

        {/* Right — Stats + Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <StatsRow client={client} />

          <Tabs defaultValue="quotes" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="quotes">Devis</TabsTrigger>
              <TabsTrigger value="invoices">Factures</TabsTrigger>
              <TabsTrigger value="chantiers">Chantiers</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="mt-4">
              <PlaceholderTab label="Devis liés à ce client" />
            </TabsContent>
            <TabsContent value="invoices" className="mt-4">
              <PlaceholderTab label="Factures liées à ce client" />
            </TabsContent>
            <TabsContent value="chantiers" className="mt-4">
              <PlaceholderTab label="Chantiers liés à ce client" />
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <div className="space-y-4">
                <ClientNoteForm clientId={client.id} />
                <p className="text-sm text-slate-400 text-center py-6">
                  Les notes apparaîtront ici
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ client }: { client: Client }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
      <h3 className="text-sm font-semibold text-slate-700">Coordonnées</h3>
      {client.phone && (
        <a href={`tel:${client.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#1E40AF]">
          <Phone className="w-4 h-4" /> {client.phone}
        </a>
      )}
      {client.email && (
        <a href={`mailto:${client.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#1E40AF]">
          <Mail className="w-4 h-4" /> {client.email}
        </a>
      )}
      {client.city && (
        <p className="flex items-center gap-3 text-sm text-slate-600">
          <MapPin className="w-4 h-4" /> {client.address ? `${client.address}, ` : ''}{client.city}
        </p>
      )}
      {client.siret && (
        <p className="flex items-center gap-3 text-sm text-slate-600">
          <Building className="w-4 h-4" /> SIRET : {client.siret}
        </p>
      )}
    </div>
  )
}

function StatsRow({ client }: { client: Client }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Devis" value={String(client.total_quotes)} color={client.total_quotes > 0 ? 'text-[#1E40AF]' : 'text-slate-400'} />
      <StatCard label="Factures" value={String(client.total_invoices)} color={client.total_invoices > 0 ? 'text-[#F97316]' : 'text-slate-400'} />
      <StatCard label="CA total" value={formatCurrency(client.total_revenue)} color={parseFloat(client.total_revenue) > 0 ? 'text-[#10B981]' : 'text-slate-400'} />
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  )
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="text-center py-8">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-xs text-slate-300 mt-1">Disponible après implémentation du module correspondant</p>
    </div>
  )
}
