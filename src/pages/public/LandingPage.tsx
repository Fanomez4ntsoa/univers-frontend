import { useFaq } from '../../features/public/hooks/usePublicContent'
import HeroSection from '../../features/public/components/landing/HeroSection'
import ProblemSection from '../../features/public/components/landing/ProblemSection'
import SolutionSection from '../../features/public/components/landing/SolutionSection'
import PricingSection from '../../features/public/components/landing/PricingSection'
import FounderSection from '../../features/public/components/landing/FounderSection'
import FAQSection from '../../features/public/components/landing/FAQSection'
import FinalCTASection from '../../features/public/components/landing/FinalCTASection'

export default function LandingPage() {
  const { data: faqItems } = useFaq()

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <PricingSection />
      <FounderSection />
      <FAQSection items={faqItems} />
      <FinalCTASection />
    </>
  )
}
