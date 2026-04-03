import { motion } from 'framer-motion'
import { BarChart3, Bot, Users, Zap, Check } from 'lucide-react'

const solutions = [
  { icon: BarChart3, title: 'CRM Bâtiment', desc: 'Un outil conçu spécifiquement pour les artisans. Pipeline commercial, devis, factures, chantiers : tout au même endroit.' },
  { icon: Bot, title: 'Agents IA', desc: '7 agents spécialisés qui travaillent 24h/24 : standard téléphonique, emails, marketing, prospection...' },
  { icon: Users, title: 'Assistants humains', desc: 'Des assistants formés à ton métier qui comprennent tes besoins et gèrent tes tâches administratives.' },
  { icon: Zap, title: 'Automatisation', desc: 'Des workflows automatisés pour les tâches répétitives : relances, rappels, suivi des paiements...' },
]

const outcomes = ['D\'artisan débordé à entrepreneur organisé', 'Des devis envoyés en quelques minutes', 'Des clients suivis et relancés automatiquement', 'Une vision claire de ton activité', 'Plus de temps pour ce qui compte vraiment']

export default function SolutionSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#1E40AF]/10 text-[#1E40AF] text-sm font-medium px-4 py-1.5 rounded-full mb-4">La solution BatiAssist</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Transforme ton organisation en quelques clics</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">BatiAssist combine CRM métier, agents IA, assistants humains et automatisation pour t'aider à développer ton activité.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {solutions.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <s.icon className="w-8 h-8 text-[#1E40AF] mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="bg-[#1E40AF] rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-4">L'objectif : transformer un artisan débordé en entrepreneur organisé</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {outcomes.map((o) => (
              <span key={o} className="flex items-center gap-1.5 text-sm bg-white/10 px-3 py-1.5 rounded-full">
                <Check className="w-4 h-4" /> {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
