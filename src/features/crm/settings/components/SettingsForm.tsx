import { useState, useEffect, type FormEvent } from 'react'
import { Building, Phone, MapPin, FileText, Hash } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { toast } from 'sonner'
import { useUpdateSettings } from '../hooks/useSettings'
import type { CompanySettings } from '../../../../shared/types/crm'
import type { AxiosError } from 'axios'
import SettingsLogoUpload from './SettingsLogoUpload'

interface SettingsFormProps {
  settings: CompanySettings
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const updateMutation = useUpdateSettings()

  const [companyName, setCompanyName] = useState('')
  const [siret, setSiret] = useState('')
  const [tvaNumber, setTvaNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [paymentTerms, setPaymentTerms] = useState('')
  const [cgvText, setCgvText] = useState('')
  const [bankDetails, setBankDetails] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  useEffect(() => {
    setCompanyName(settings.company_name ?? '')
    setSiret(settings.siret ?? '')
    setTvaNumber(settings.tva_number ?? '')
    setPhone(settings.phone ?? '')
    setEmail(settings.email ?? '')
    setWebsite(settings.website ?? '')
    setAddress(settings.address ?? '')
    setCity(settings.city ?? '')
    setPostalCode(settings.postal_code ?? '')
    setPaymentTerms(settings.payment_terms ?? '')
    setCgvText(settings.cgv_text ?? '')
    setBankDetails(settings.bank_details ?? '')
    setLogoUrl(settings.logo_url ?? '')
  }, [settings])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(
      {
        company_name: companyName, siret, tva_number: tvaNumber || null,
        phone, email, website: website || null,
        address, city, postal_code: postalCode,
        payment_terms: paymentTerms, cgv_text: cgvText,
        bank_details: bankDetails || null, logo_url: logoUrl || null,
      },
      {
        onSuccess: () => toast.success('Paramètres sauvegardés'),
        onError: (error) => {
          const axiosError = error as AxiosError<{ message?: string }>
          toast.error(axiosError.response?.data?.message ?? 'Erreur lors de la sauvegarde')
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Entreprise */}
      <Section icon={<Building className="w-5 h-5" />} title="Entreprise">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom de l'entreprise" value={companyName} onChange={setCompanyName} placeholder="Mon Entreprise SARL" />
          <Field label="SIRET" value={siret} onChange={setSiret} placeholder="123 456 789 00012" />
          <Field label="N° TVA" value={tvaNumber} onChange={setTvaNumber} placeholder="FR12345678901" />
        </div>
        <div className="mt-4">
          <SettingsLogoUpload logoUrl={logoUrl} onChange={setLogoUrl} />
        </div>
      </Section>

      {/* Contact */}
      <Section icon={<Phone className="w-5 h-5" />} title="Contact">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Téléphone" value={phone} onChange={setPhone} placeholder="06 12 34 56 78" />
          <Field label="Email" value={email} onChange={setEmail} placeholder="contact@entreprise.fr" type="email" />
          <Field label="Site web" value={website} onChange={setWebsite} placeholder="https://www.entreprise.fr" />
        </div>
      </Section>

      {/* Adresse */}
      <Section icon={<MapPin className="w-5 h-5" />} title="Adresse">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Field label="Adresse" value={address} onChange={setAddress} placeholder="14 rue des Acacias" />
          </div>
          <Field label="Ville" value={city} onChange={setCity} placeholder="Paris" />
          <Field label="Code postal" value={postalCode} onChange={setPostalCode} placeholder="75001" />
        </div>
      </Section>

      {/* Documents */}
      <Section icon={<FileText className="w-5 h-5" />} title="Documents">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Conditions de paiement</label>
            <textarea value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} rows={3} placeholder="Paiement à 30 jours..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Conditions générales de vente (CGV)</label>
            <textarea value={cgvText} onChange={(e) => setCgvText(e.target.value)} rows={5} placeholder="Article 1 — Objet..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Coordonnées bancaires (RIB)</label>
            <textarea value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} rows={2} placeholder="IBAN : FR76 ..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 resize-none" />
          </div>
        </div>
      </Section>

      {/* Compteurs (lecture seule) */}
      <Section icon={<Hash className="w-5 h-5" />} title="Compteurs">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#1E40AF]">{settings.quote_counter}</p>
            <p className="text-xs text-slate-500 mt-1">Prochain numéro de devis</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#F97316]">{settings.invoice_counter}</p>
            <p className="text-xs text-slate-500 mt-1">Prochain numéro de facture</p>
          </div>
        </div>
      </Section>

      {/* Submit */}
      <div className="flex justify-end pt-4 border-t border-slate-200">
        <Button type="submit" disabled={updateMutation.isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer h-11 px-8">
          {updateMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
        </Button>
      </div>
    </form>
  )
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#1E40AF]">{icon}</span>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-11 rounded-xl" />
    </div>
  )
}
