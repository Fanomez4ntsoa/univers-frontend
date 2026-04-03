import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Calendar } from 'lucide-react'
import { Button } from '../../shared/ui/button'
import { Input } from '../../shared/ui/input'
import { toast } from 'sonner'
import { useContactForm } from '../../features/public/hooks/usePublicContent'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const contactMutation = useContactForm()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) { toast.error('Remplis les champs obligatoires'); return }
    contactMutation.mutate({ name, email, phone: phone || undefined, company: company || undefined, message }, {
      onSuccess: () => { toast.success('Message envoyé — nous te répondons sous 24h'); setName(''); setEmail(''); setPhone(''); setCompany(''); setMessage('') },
      onError: () => toast.error('Erreur lors de l\'envoi'),
    })
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Contacte-nous</h1>
          <p className="text-slate-600">Une question ? Un projet ? Nous te répondrons dans les plus brefs délais.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Envoie-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ton nom" className="h-11 rounded-xl" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Email *</label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ton@email.com" className="h-11 rounded-xl" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 XX XX XX XX" className="h-11 rounded-xl" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Entreprise</label><Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nom de ton entreprise" className="h-11 rounded-xl" /></div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Message *</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Comment pouvons-nous t'aider ?" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20" /></div>
              <Button type="submit" disabled={contactMutation.isPending} className="w-full bg-[#1E40AF] hover:bg-blue-800 h-11 rounded-lg text-white cursor-pointer">
                {contactMutation.isPending ? 'Envoi...' : 'Envoyer le message'}
              </Button>
            </form>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5"><Mail className="w-5 h-5 text-[#1E40AF] mb-2" /><h3 className="font-medium text-slate-900 text-sm">Email</h3><p className="text-sm text-slate-600">hello@abracadabati.com</p></div>
            <div className="bg-white rounded-xl border border-slate-200 p-5"><Calendar className="w-5 h-5 text-[#1E40AF] mb-2" /><h3 className="font-medium text-slate-900 text-sm">Téléphone</h3><p className="text-sm text-slate-600">Réserve un entretien</p></div>
            <div className="bg-white rounded-xl border border-slate-200 p-5"><MapPin className="w-5 h-5 text-[#1E40AF] mb-2" /><h3 className="font-medium text-slate-900 text-sm">Localisation</h3><p className="text-sm text-slate-600">Europe (France, Suisse) & Madagascar</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}
