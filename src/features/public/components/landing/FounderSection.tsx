import { motion } from 'framer-motion'
import { Quote, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'

const FOUNDER_IMG = 'https://customer-assets.emergentagent.com/job_4e491698-f834-49a8-a1e5-8fd3efa88feb/artifacts/35vjb36h_FB_IMG_1772976275108.jpg'

const paragraphs = [
  'Je suis entrepreneur depuis l\'âge de 20 ans. Depuis plus de 27 ans, j\'ai créé et développé plusieurs entreprises dans différents secteurs.',
  'J\'ai notamment créé et géré trois clubs de remise en forme, dirigé le plus grand complexe de remise en forme d\'Afrique, créé une agence marketing, et bâti une entreprise dans l\'univers de la piscine avec plus de 1500 piscines construites dans 7 pays.',
  'Mais comme beaucoup d\'entrepreneurs, j\'ai aussi connu la réalité du terrain : trop d\'opérationnel, trop de responsabilités, et une entreprise qui finit par dépendre entièrement de toi. En 2023, j\'ai tout perdu.',
  'J\'ai pris une décision radicale : partir à Madagascar pendant 10 mois pour reconstruire un nouveau système. Un système basé sur des assistants humains, des outils d\'automatisation et l\'intelligence artificielle.',
  'C\'est de cette expérience qu\'est né BatiAssist. Aujourd\'hui, je partage ce système avec d\'autres entrepreneurs pour les aider à ne pas vivre ce que j\'ai vécu.',
]

export default function FounderSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <span className="inline-block bg-[#3B82F6]/20 text-[#1E40AF] text-sm font-medium px-4 py-1.5 rounded-full mb-4">L&apos;histoire du fondateur</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8">Créé par un entrepreneur, <span className="text-[#F97316]">pour les entrepreneurs</span></h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative inline-block mb-8">
          <img src={FOUNDER_IMG} alt="Fondateur BatiAssist" className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover mx-auto shadow-xl" />
          <span className="absolute -bottom-3 -right-3 bg-[#1E40AF] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">27+ ans d&apos;expérience</span>
        </motion.div>
        <div className="space-y-4 text-left sm:text-center">
          <Quote className="w-8 h-8 text-[#3B82F6]/20 mx-auto mb-2 hidden sm:block" />
          {paragraphs.map((p, i) => (<p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed">{p}</p>))}
        </div>
        <Link to="/a-propos" className="inline-block mt-8">
          <Button className="bg-[#F97316] hover:bg-orange-600 text-white h-11 px-6 rounded-lg cursor-pointer">Lire l&apos;histoire complète <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </Link>
      </div>
    </section>
  )
}
