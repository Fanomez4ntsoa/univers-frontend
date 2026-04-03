import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function FounderSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#1E40AF]/10 text-[#1E40AF] text-sm font-medium px-4 py-1.5 rounded-full mb-4">L'histoire du fondateur</span>
          <h2 className="text-3xl font-bold text-slate-900">Créé par un entrepreneur, pour les entrepreneurs</h2>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-200 p-8 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Fondateur" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
            <div>
              <span className="inline-block bg-[#F97316]/10 text-[#F97316] text-xs font-medium px-3 py-1 rounded-full mb-3">27+ ans d'expérience</span>
              <Quote className="w-8 h-8 text-[#1E40AF]/20 mb-2" />
              <p className="text-slate-600 mb-4">
                Je suis entrepreneur depuis l'âge de 20 ans. J'ai créé et développé plusieurs entreprises. Mais comme beaucoup d'entrepreneurs, j'ai aussi connu la réalité du terrain : trop d'opérationnel, et une entreprise qui finit par dépendre entièrement de toi. En 2023, j'ai tout perdu.
              </p>
              <p className="text-slate-600 mb-4">
                J'ai pris une décision radicale : partir à Madagascar pendant 10 mois pour reconstruire un nouveau système. Un système basé sur des assistants humains, des outils d'automatisation et l'intelligence artificielle.
              </p>
              <p className="text-slate-900 font-medium">
                C'est de cette expérience qu'est né BatiAssist. Aujourd'hui, je partage ce système avec d'autres entrepreneurs pour les aider à ne pas vivre ce que j'ai vécu.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
