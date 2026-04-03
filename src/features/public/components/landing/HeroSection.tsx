import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Bot, Clock, Building2, FileText } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'

const HERO_IMG = 'https://static.prod-images.emergentagent.com/jobs/4e491698-f834-49a8-a1e5-8fd3efa88feb/images/f2de8f2bd2e54b61afe81c4eb8331c09560d1c5a174c7757ebb8c615968d2e48.png'
const CALENDLY = 'https://calendly.com/romain-trallero/diagnostic-transition-digitale-60min'

const BENEFITS = ['CRM bâtiment prêt à l\'emploi', 'Agents IA qui travaillent 24h/24', 'Assistants humains disponibles', 'Organisation complète de ton activité']
const STATS = [
  { icon: Bot, value: '7', label: 'Agents IA' },
  { icon: Clock, value: '24/7', label: 'Disponible' },
  { icon: Building2, value: '100%', label: 'Bâtiment' },
  { icon: FileText, value: '3min', label: 'Devis' },
]

export default function HeroLanding() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-12 sm:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#F97316]/10 text-[#F97316] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">L&apos;assistant digital des artisans</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Tu travailles sur tes chantiers, <span className="text-[#F97316]">BatiAssist s&apos;occupe</span> du reste
            </h1>
            <p className="text-lg text-slate-600 mb-6">BatiAssist organise ton entreprise, automatise les tâches et t&apos;aide à développer ton activité.</p>
            <ul className="space-y-2 mb-8">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />{b}</li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#F97316] hover:bg-orange-600 text-white h-12 px-8 rounded-lg text-base cursor-pointer">
                  Diagnostic gratuit <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/landing#tarifs">
                <Button variant="outline" className="h-12 px-8 rounded-lg text-base border-slate-200 text-slate-700">Test en 3 minutes</Button>
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
            <img src={HERO_IMG} alt="BatiAssist" className="w-full max-w-lg mx-auto" />
          </motion.div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="text-center bg-white rounded-xl p-4 border border-slate-100">
              <s.icon className="w-6 h-6 text-[#1E40AF] mx-auto mb-1" />
              <p className="text-xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
