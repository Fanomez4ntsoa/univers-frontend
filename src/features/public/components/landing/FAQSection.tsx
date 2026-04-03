import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FALLBACK_FAQ = [
  { question: 'Comment fonctionne BatiAssist ?', answer: 'BatiAssist combine un CRM bâtiment complet, 7 agents IA spécialisés et des assistants humains pour gérer ton entreprise. Les agents travaillent 24h/24 sur les tâches répétitives, supervisés par un assistant humain qui coordonne le tout.' },
  { question: 'Que font les agents IA ?', answer: 'Les 7 agents IA gèrent : le standard téléphonique, le service client (messagerie BatiAssist, SMS), les emails, le marketing sur les réseaux sociaux, le SEO et le blog, la prospection, et les tâches administratives.' },
  { question: 'Que fait l\'assistant humain ?', answer: 'Ton assistant humain supervise les agents IA, vérifie leur travail, gère les cas complexes, et communique directement avec toi via la messagerie BatiAssist intégrée.' },
  { question: 'Combien coûte BatiAssist ?', answer: 'Trois formules : Assistant Mi-Temps à 499€/mois, Assistant Dédié à 949€/mois, Croissance à 1499€/mois. Frais de mise en place : 500€.' },
  { question: 'Y a-t-il un engagement ?', answer: 'Non, BatiAssist fonctionne sous forme d\'abonnement flexible sans engagement longue durée. Tu peux ajuster ou arrêter à tout moment.' },
  { question: 'Quand le service commence-t-il ?', answer: 'Après la validation de l\'inscription, une phase de préparation d\'environ 15 jours est nécessaire pour configurer ton CRM, activer les agents IA et former ton assistant.' },
  { question: 'Le CRM est-il adapté à mon métier ?', answer: 'Oui, BatiAssist a été conçu spécifiquement pour les artisans du bâtiment : plombiers, électriciens, maçons, piscinistes, carreleurs, menuisiers, peintres, couvreurs.' },
  { question: 'Mes données sont-elles protégées ?', answer: 'Oui, toutes les informations de ton entreprise sont traitées de manière confidentielle avec des protocoles de sécurité stricts. Tes données restent ta propriété.' },
]

interface FAQSectionProps { items?: { question: string; answer: string }[] }

export default function FAQSection({ items }: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const faq = items && items.length > 0 ? items : FALLBACK_FAQ

  return (
    <section className="py-12 sm:py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#1E40AF]/10 text-[#1E40AF] text-sm font-medium px-4 py-1.5 rounded-full mb-4">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Questions fréquentes</h2>
          <p className="text-slate-600">Tout ce que tu dois savoir sur BatiAssist</p>
        </div>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-medium text-slate-800 pr-4">{item.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <p className="px-5 pb-5 text-sm text-slate-600">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
