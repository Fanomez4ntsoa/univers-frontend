import { useFaq } from '../../features/public/hooks/usePublicContent'
import PricingSection from '../../features/public/components/landing/PricingSection'
import FAQSection from '../../features/public/components/landing/FAQSection'
import FinalCTASection from '../../features/public/components/landing/FinalCTASection'

export default function PricingPage() {
  const { data: faqItems } = useFaq()

  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-white py-12 text-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Tarifs simples et transparents</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Choisis la formule qui correspond à tes besoins. Sans engagement.</p>
        </div>
      </div>
      <PricingSection />
      <FAQSection items={faqItems} />
      <FinalCTASection />
    </>
  )
}
