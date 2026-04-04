// MarketplaceTrust.tsx — Fidèle à Emergent Trust Footer
// 4 items : Livraison rapide, Paiement sécurisé, Meilleurs prix, Qualité pro

import { Truck, Shield, Tag, Star } from 'lucide-react'

const TRUST_ITEMS = [
  { icon: Truck, text: 'Livraison rapide', subtext: 'Partout en France' },
  { icon: Shield, text: 'Paiement sécurisé', subtext: '100% protégé' },
  { icon: Tag, text: 'Meilleurs prix', subtext: 'Garantis' },
  { icon: Star, text: 'Qualité pro', subtext: 'Matériaux certifiés' },
]

export default function MarketplaceTrust() {
  return (
    <div className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#1E40AF]/10 flex items-center justify-center mb-3">
                <item.icon size={24} className="text-[#1E40AF]" />
              </div>
              <span className="font-semibold text-gray-900">{item.text}</span>
              <span className="text-sm text-gray-500">{item.subtext}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
