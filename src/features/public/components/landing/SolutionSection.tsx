import { motion } from 'framer-motion'
import { BarChart3, Bot, Users, Zap, Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'

const solutions = [
  { icon: BarChart3, title: 'CRM Bâtiment', desc: 'Un outil conçu spécifiquement pour les artisans. Pipeline commercial, devis, factures, chantiers : tout au même endroit.', bg: 'bg-blue-50', text: 'text-[#1E40AF]', border: 'border-blue-100' },
  { icon: Bot, title: 'Agents IA', desc: '7 agents spécialisés qui travaillent 24h/24 : standard téléphonique, emails, marketing, prospection...', bg: 'bg-orange-50', text: 'text-[#F97316]', border: 'border-orange-100' },
  { icon: Users, title: 'Assistants humains', desc: 'Des assistants formés à ton métier qui comprennent tes besoins et gèrent tes tâches administratives.', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
  { icon: Zap, title: 'Automatisation', desc: 'Des workflows automatisés pour les tâches répétitives : relances, rappels, suivi des paiements...', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
]

const outcomes = ['D\'artisan débordé à entrepreneur organisé', 'Des devis envoyés en quelques minutes', 'Des clients suivis et relancés automatiquement', 'Une vision claire de ton activité', 'Plus de temps pour ce qui compte vraiment']

export default function SolutionSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#1E40AF]/10 text-[#1E40AF] text-sm font-medium px-4 py-1.5 rounded-full mb-4">La solution BatiAssist</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Transforme ton organisation <span className="text-[#F97316]">en quelques clics</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">BatiAssist combine CRM métier, agents IA, assistants humains et automatisation pour t&apos;aider à développer ton activité.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {solutions.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`${s.bg} rounded-2xl p-5 border ${s.border} hover:shadow-lg transition-all`}>
              <s.icon className={`w-8 h-8 ${s.text} mb-3`} />
              <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="bg-[#1E40AF] rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">L&apos;objectif : transformer un artisan débordé en entrepreneur organisé</h3>
              <p className="text-blue-200 mb-4">Avec BatiAssist, tu passes de &quot;je gère tout seul&quot; à &quot;j&apos;ai une équipe qui m&apos;aide&quot;.</p>
              <ul className="space-y-2">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-sm text-white"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />{o}</li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <Link to="/landing">
                <Button className="bg-[#F97316] hover:bg-orange-600 text-white h-12 px-8 rounded-lg text-base cursor-pointer">
                  Découvrir BatiAssist <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
