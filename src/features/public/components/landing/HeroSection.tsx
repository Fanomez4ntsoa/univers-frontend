import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Clock, Building2, FileText } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'

const stats = [
  { icon: Bot, value: '7', label: 'Agents IA' },
  { icon: Clock, value: '24/7', label: 'Disponible' },
  { icon: Building2, value: '100%', label: 'Bâtiment' },
  { icon: FileText, value: '3min', label: 'Devis' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#1E40AF]/10 text-[#1E40AF] text-sm font-medium px-4 py-1.5 rounded-full mb-6">L'assistant digital des artisans</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Tu travailles sur tes chantiers,{' '}
            <span className="text-[#1E40AF]">BatiAssist s'occupe du reste</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            BatiAssist organise ton entreprise, automatise les tâches et t'aide à développer ton activité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button className="bg-[#1E40AF] hover:bg-blue-800 text-white h-12 px-8 rounded-lg text-base cursor-pointer">
                Diagnostic gratuit <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/tarifs">
              <Button variant="outline" className="h-12 px-8 rounded-lg text-base">Voir les tarifs</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="w-6 h-6 text-[#1E40AF] mx-auto mb-1" />
                <p className="text-xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
