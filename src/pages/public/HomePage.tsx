import HeroSection from '../../features/public/components/home/HeroSection'
import UniversSection from '../../features/public/components/home/UniversSection'
import { WhySellSection, WhyBuySection } from '../../features/public/components/home/WhySellSection'
import NewsletterSection from '../../features/public/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <HeroSection />
      <UniversSection />
      <WhySellSection />
      <WhyBuySection />
      <NewsletterSection />
    </div>
  )
}
