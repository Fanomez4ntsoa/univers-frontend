import HeroSection from '../../features/public/components/home/HeroSection'
import UniversSection from '../../features/public/components/home/UniversSection'
import BestArtisansSection from '../../features/public/components/home/BestArtisansSection'
import { WhySellSection, WhyBuySection } from '../../features/public/components/home/WhySellSection'
import FounderCTASection from '../../features/public/components/home/FounderCTASection'
import VentesFlashSection from '../../features/public/components/home/VentesFlashSection'
import ProduitsSection from '../../features/public/components/home/ProduitsSection'
import NewsletterSection from '../../features/public/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <HeroSection />
      <UniversSection />
      <BestArtisansSection />
      <WhySellSection />
      <FounderCTASection />
      <VentesFlashSection />
      <ProduitsSection />
      <WhyBuySection />
      <NewsletterSection />
    </div>
  )
}
