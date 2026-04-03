import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-2xl p-6 sm:p-10 text-center text-white">
          <Mail className="w-10 h-10 mx-auto mb-3 text-white/80" />
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Reste informé</h2>
          <p className="text-blue-200 text-sm mb-6">Reçois les dernières actualités, offres exclusives et conseils du bâtiment</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ton adresse email" className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none" />
            <button className="px-6 py-3 bg-[#F97316] hover:bg-orange-600 text-white rounded-xl font-semibold text-sm transition-colors">S'inscrire</button>
          </div>
          <p className="text-xs text-blue-300 mt-3">Pas de spam, désabonnement en un clic</p>
        </div>
      </div>
    </section>
  )
}
