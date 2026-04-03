import { motion } from 'framer-motion'
import { Clock, Phone, FileText, Wallet, Users, Brain } from 'lucide-react'

const problems = [
  { icon: Clock, title: 'Journées sur les chantiers', desc: 'Tu passes tes journées à travailler, sans temps pour gérer ton entreprise.' },
  { icon: Phone, title: 'Appels et messages non-stop', desc: 'Tu réponds aux appels entre deux coups de marteau, au risque de rater des opportunités.' },
  { icon: FileText, title: 'Devis le soir', desc: 'Tu fais tes devis tard le soir, fatigué, alors que le client attend depuis des jours.' },
  { icon: Wallet, title: 'Trésorerie tendue', desc: 'Les factures s\'accumulent, pas le temps de relancer, les paiements tardent.' },
  { icon: Users, title: 'Recherche de clients', desc: 'Pas le temps de prospecter, tu dépends du bouche-à-oreille.' },
  { icon: Brain, title: 'Stress permanent', desc: 'Tu gères tout seul : technique, commercial, administratif. C\'est épuisant.' },
]

export default function ProblemSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-50 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">La réalité du terrain</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Le quotidien des artisans est épuisant</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Plombiers, électriciens, maçons, peintres... Tu es nombreux à vivre cette réalité chaque jour.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-red-50/50 rounded-xl p-6 border border-red-100">
              <p.icon className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-sm text-slate-600">{p.desc}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-lg font-semibold text-red-600 mt-10">Résultat : ton entreprise dépend entièrement de toi</p>
      </div>
    </section>
  )
}
