import { useState } from 'react'

import { Sparkles, Building2 } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'

const CALENDLY = 'https://calendly.com/romain-trallero/diagnostic-transition-digitale-60min'
const LOGO_URL = 'https://static.prod-images.emergentagent.com/jobs/4e491698-f834-49a8-a1e5-8fd3efa88feb/images/d77c0364065b8ec483b9e6915ff1d30475de2851aefe5560f16a14318cc351be.png'

export default function FinalCTASection() {
  const [email, setEmail] = useState('')

  return (
    <section className="relative py-16 sm:py-24 bg-[#1E40AF] overflow-hidden">
      <div className="absolute inset-0"><div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" /><div className="absolute bottom-10 right-20 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl" /></div>
      <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
        <img src={LOGO_URL} alt="BatiAssist" className="h-12 mx-auto mb-6 brightness-0 invert" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Et si ton entreprise fonctionnait <span className="text-[#F97316]">enfin différemment</span> ?</h2>
        <p className="text-white/70 text-lg mb-8">Réserve un entretien avec Romain pour découvrir comment BatiAssist peut transformer ton organisation.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#F97316] hover:bg-orange-600 text-white h-14 px-10 rounded-xl text-lg font-semibold shadow-2xl cursor-pointer mb-8">
            <Sparkles className="w-5 h-5 mr-2" /> Réserver un entretien avec Romain
          </Button>
        </a>
        <div className="flex items-center gap-4 max-w-md mx-auto mb-6">
          <div className="flex-1 h-px bg-white/20" /><span className="text-white/50 text-sm">ou laisse-nous tes coordonnées</span><div className="flex-1 h-px bg-white/20" />
        </div>
        <div className="flex gap-3 max-w-md mx-auto">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ton email professionnel" className="flex-1 px-4 py-3 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]" />
          <Button className="bg-white text-[#1E40AF] hover:bg-white/90 px-6 py-3 rounded-xl font-semibold cursor-pointer">Être recontacté</Button>
        </div>
        <p className="text-white/50 text-sm mt-6">Diagnostic gratuit · Sans engagement · Réponse sous 24h</p>
      </div>
      <div className="border-t border-white/10 mt-12 pt-6">
        <div className="container mx-auto px-4 max-w-3xl flex items-center justify-between text-white/40 text-sm">
          <span className="flex items-center gap-2"><Building2 className="w-4 h-4" />BatiAssist - L&apos;assistant digital des artisans du bâtiment</span>
          <span>© 2024 BatiAssist</span>
        </div>
      </div>
    </section>
  )
}
