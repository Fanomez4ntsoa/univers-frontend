import { Zap } from 'lucide-react'
import SectionHeader from './SectionHeader'
import FlashProductCard from './FlashProductCard'
import type { FlashProduct } from './FlashProductCard'

const MOCK_FLASH_PRODUCTS: FlashProduct[] = [
  {
    id: 'flash-1',
    title: 'Perceuse Bosch Pro 18V',
    price: 299,
    flash_price: 199,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
    category: 'Outillage',
  },
  {
    id: 'flash-2',
    title: 'Kit Plomberie Complet',
    price: 150,
    flash_price: 89,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    category: 'Plomberie',
  },
  {
    id: 'flash-3',
    title: 'Disqueuse Makita 125mm',
    price: 189,
    flash_price: 129,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400',
    category: 'Outillage',
  },
  {
    id: 'flash-4',
    title: 'Niveau Laser Dewalt',
    price: 450,
    flash_price: 299,
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400',
    category: 'Mesure',
  },
]

export default function VentesFlashSection() {
  return (
    <section className="py-8 sm:py-12 px-4 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Zap}
          title="Ventes Flash"
          subtitle="Offres limitées dans le temps"
          link="/shops"
          color="#EF4444"
        />

        {/* Scroll horizontal */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {MOCK_FLASH_PRODUCTS.map((product, index) => (
              <FlashProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
