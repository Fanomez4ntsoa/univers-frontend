import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'

export default function FinalCTASection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#1E40AF] to-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Et si ton entreprise fonctionnait enfin différemment ?</h2>
        <p className="text-blue-200 text-lg mb-8">Découvre comment BatiAssist peut transformer ton organisation.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button className="bg-[#F97316] hover:bg-orange-600 text-white h-12 px-8 rounded-lg text-base cursor-pointer">
              Commencer gratuitement <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="h-12 px-8 rounded-lg text-base border-white/30 text-white hover:bg-white/10">
              Être recontacté
            </Button>
          </Link>
        </div>
        <p className="text-sm text-blue-300 mt-6">Diagnostic gratuit · Sans engagement · Réponse sous 24h</p>
      </div>
    </section>
  )
}
