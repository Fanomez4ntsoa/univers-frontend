// UniversSection.tsx — Fidèle à ~/project/AbracadaBati/frontend/src/pages/HomePage.jsx
// Section "Explorez nos univers" — 6 cards gradient
// Mobile: grille 2x3 compacte | Desktop: grille 3 colonnes avec hover

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wrench, Store, ShoppingBag, Users, Briefcase, Building2, ArrowRight, Globe } from 'lucide-react'
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
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#1E40AF]/10 rounded-full text-[#1E40AF] text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Globe size={14} className="sm:w-4 sm:h-4" />
            6 Univers • 1 Plateforme
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Explorez nos univers
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Tout ce dont tu as besoin pour tes projets de construction et rénovation
          </p>
        </div>

        {/* Mobile: Grille 2x3 compacte */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {UNIVERS.map((univers, index) => (
            <Link key={univers.title} to={univers.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative h-28 rounded-2xl overflow-hidden"
                style={{ background: univers.gradient }}
              >
                <div className="absolute inset-0 p-3 flex flex-col justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <univers.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{univers.title}</h3>
                    <p className="text-[10px] text-white/70">{univers.count}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Desktop + Tablette: Grille 3 colonnes */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERS.map((univers, index) => (
            <UniversCard key={univers.title} univers={univers} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function UniversCard({ univers, index }: { univers: Univers; index: number }) {
  return (
    <Link to={univers.path}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
        className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group"
        style={{ background: univers.gradient }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <univers.icon size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{univers.title}</h3>
            <p className="text-white/80 text-sm">{univers.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">{univers.count}</span>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowRight size={20} className="text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
