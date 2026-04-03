import { motion } from 'framer-motion'
import { Check, MapPin, Briefcase, Heart } from 'lucide-react'

const FOUNDER_IMG = 'https://customer-assets.emergentagent.com/job_4e491698-f834-49a8-a1e5-8fd3efa88feb/artifacts/35vjb36h_FB_IMG_1772976275108.jpg'
const TEAM_IMG = 'https://customer-assets.emergentagent.com/job_4e491698-f834-49a8-a1e5-8fd3efa88feb/artifacts/x1wh0gls_FB_IMG_1772976581762.jpg'

const achievements = [
  'Créé et géré trois clubs de remise en forme',
  'Dirigé le plus grand complexe de remise en forme d\'Afrique et le second du monde',
  'Créé un cabinet de conseil',
  'Créé une agence marketing',
  'Créé un café concert',
  'Créé une entreprise dans l\'univers de la piscine, avec plus de 1500 piscines construites dans 7 pays',
]

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Créé par un entrepreneur, pour les entrepreneurs</h1>
          <p className="text-slate-600 text-lg">L'histoire derrière BatiAssist</p>
        </motion.div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col sm:flex-row gap-6">
            <img src={FOUNDER_IMG} alt="Fondateur" className="w-32 h-32 rounded-xl object-cover flex-shrink-0" />
            <div>
              <span className="inline-block bg-[#F97316]/10 text-[#F97316] text-xs font-medium px-3 py-1 rounded-full mb-3">27+ ans d'expérience</span>
              <p className="text-slate-600">Je suis entrepreneur depuis l'âge de 20 ans. Depuis plus de 27 ans, j'ai créé et développé plusieurs entreprises dans différents secteurs.</p>
              <ul className="mt-4 space-y-2">{achievements.map((a) => <li key={a} className="flex items-start gap-2 text-sm text-slate-600"><Check className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />{a}</li>)}</ul>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-4"><MapPin className="w-5 h-5 text-[#1E40AF]" /><h2 className="text-xl font-bold text-slate-900">Une rencontre qui va tout changer</h2></div>
            <p className="text-slate-600 mb-4">En 2017, à Dubaï, j'ai découvert la possibilité de travailler avec des talents basés à Madagascar. J'ai commencé avec une seule personne. Deux ans plus tard, plus de 40 personnes travaillaient dans mes équipes.</p>
          </div>

          <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
            <div className="flex items-center gap-2 mb-4"><Briefcase className="w-5 h-5 text-red-500" /><h2 className="text-xl font-bold text-slate-900">La chute</h2></div>
            <p className="text-slate-600 mb-4">En 2023, malgré toute mon expérience, je me suis retrouvé complètement dans l'opérationnel. Je n'avais pas suffisamment délégué. Mon entreprise est passée avant tout le reste. J'ai tout perdu.</p>
          </div>

          <div className="bg-[#1E40AF] rounded-2xl p-8 text-white">
            <div className="flex items-center gap-2 mb-4"><Heart className="w-5 h-5" /><h2 className="text-xl font-bold">La naissance de BatiAssist</h2></div>
            <p className="text-blue-100 mb-4">J'ai pris une décision radicale : partir à Madagascar pendant 10 mois pour reconstruire un nouveau système basé sur des assistants humains, l'automatisation et l'intelligence artificielle.</p>
            <p className="text-white font-medium">C'est de cette expérience qu'est né BatiAssist. Pour aider d'autres entrepreneurs à ne pas vivre ce que j'ai vécu.</p>
          </div>

          <div className="text-center">
            <img src={TEAM_IMG} alt="Équipe Madagascar" className="w-full max-w-2xl mx-auto rounded-2xl" />
            <p className="text-sm text-slate-500 mt-3">Notre équipe entre l'Europe et Madagascar</p>
          </div>
        </div>
      </div>
    </div>
  )
}
