import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wrench, Store, ShoppingBag, Users, Briefcase, Building2, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Univers {
  title: string
  description: string
  icon: LucideIcon
  path: string
  gradient: string
  count: string
}

const UNIVERS: Univers[] = [
  { title: 'Artisans', description: 'Trouve des professionnels certifiés près de chez toi', icon: Wrench, path: '/discover', gradient: 'linear-gradient(135deg, #10B981, #059669)', count: 'Artisans vérifiés' },
  { title: 'Marketplace', description: 'Matériaux et outillage sans commission', icon: Store, path: '/shops', gradient: 'linear-gradient(135deg, #14285A, #1E40AF)', count: '0% commission' },
  { title: 'Entre Particuliers', description: 'Petites annonces matériaux et outillage', icon: ShoppingBag, path: '/listings', gradient: 'linear-gradient(135deg, #F97316, #FB923C)', count: 'Annonces gratuites' },
  { title: 'Réseau Social', description: 'La communauté des pros du bâtiment', icon: Users, path: '/feed', gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', count: 'Réseau pro' },
  { title: 'Emploi', description: 'Offres d\'emploi du secteur BTP', icon: Briefcase, path: '/jobs', gradient: 'linear-gradient(135deg, #EC4899, #F472B6)', count: 'Offres BTP' },
  { title: 'Réseau Pros', description: 'Centrale d\'achat dédiée aux professionnels du bâtiment', icon: Building2, path: '/discover', gradient: 'linear-gradient(135deg, #0891B2, #06B6D4)', count: 'Centrale d\'achat' },
]

export default function UniversSection() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-6">
          <span className="inline-block bg-[#1E40AF]/10 text-[#1E40AF] text-xs font-medium px-3 py-1 rounded-full mb-3">6 Univers · 1 Plateforme</span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Explorez nos univers</h2>
          <p className="text-sm text-gray-500 mt-1">Tout ce dont tu as besoin pour tes projets de construction et rénovation</p>
        </div>

        {/* Mobile: scroll horizontal */}
        <div className="sm:hidden overflow-x-auto -mx-4 px-4">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {UNIVERS.map((u, i) => <UniversCard key={u.title} univers={u} index={i} />)}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {UNIVERS.map((u, i) => <UniversCard key={u.title} univers={u} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function UniversCard({ univers, index }: { univers: Univers; index: number }) {
  return (
    <Link to={univers.path}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
        className="relative h-52 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group w-[220px] sm:w-auto flex-shrink-0" style={{ background: univers.gradient }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <univers.icon size={24} className="text-white sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{univers.title}</h3>
            <p className="text-white/80 text-xs sm:text-sm">{univers.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-xs sm:text-sm">{univers.count}</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowRight size={16} className="text-white sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
