import { motion } from 'framer-motion'
import { Clock, Phone, FileText, Wallet, Users, Brain, AlertTriangle } from 'lucide-react'

const problems = [
  { icon: Clock, title: 'Journées sur les chantiers', desc: 'Tu passes tes journées à travailler, sans temps pour gérer ton entreprise.', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
  { icon: Phone, title: 'Appels et messages non-stop', desc: 'Tu réponds aux appels entre deux coups de marteau, au risque de rater des opportunités.', bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
  { icon: FileText, title: 'Devis le soir', desc: 'Tu fais tes devis tard le soir, fatigué, alors que le client attend depuis des jours.', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
  { icon: Wallet, title: 'Trésorerie tendue', desc: 'Les factures s\'accumulent, pas le temps de relancer, les paiements tardent.', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
  { icon: Users, title: 'Recherche de clients', desc: 'Pas le temps de prospecter, tu dépends du bouche-à-oreille.', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  { icon: Brain, title: 'Stress permanent', desc: 'Tu gères tout seul : technique, commercial, administratif. C\'est épuisant.', bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100' },
]

const consequences = ['Opportunités perdues', 'Trésorerie fragilisée', 'Manque d\'organisation', 'Charge mentale élevée']

export default function ProblemSection() {
  return (
    <section className="py-12 sm:py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <span className="inline-block bg-red-100 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">La réalité du terrain</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Le quotidien des artisans <span className="text-red-500">est épuisant</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Plombiers, électriciens, maçons, peintres... Tu es nombreux à vivre cette réalité chaque jour.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`${p.bg} rounded-2xl p-5 border ${p.border} hover:shadow-lg transition-all`}>
              <p.icon className={`w-8 h-8 ${p.text} mb-3`} />
              <h3 className="font-bold text-slate-800 mb-1">{p.title}</h3>
              <p className="text-sm text-slate-600">{p.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100/50 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Résultat : ton entreprise dépend entièrement de toi</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {consequences.map((c) => (
              <div key={c} className="flex items-center gap-2 justify-center text-sm text-red-600">
                <AlertTriangle className="w-4 h-4" />{c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
