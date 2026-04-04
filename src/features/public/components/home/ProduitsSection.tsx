import { Award } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ProductCard from './ProductCard'
import type { Product } from './ProductCard'

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Carrelage Gris 60x60',
    price: 29,
    image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400',
    category: 'Carrelage',
    shop_name: 'CarrelPro',
  },
  {
    id: 'prod-2',
    title: 'Peinture Blanche 10L',
    price: 45,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400',
    category: 'Peinture',
    shop_name: 'PeinturePlus',
  },
  {
    id: 'prod-3',
    title: 'Câble Électrique 100m',
    price: 89,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    category: 'Électricité',
    shop_name: 'ElecDistrib',
  },
  {
    id: 'prod-4',
    title: 'Tube PVC 100mm',
    price: 12,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
    category: 'Plomberie',
    shop_name: 'PlombShop',
  },
  {
    id: 'prod-5',
    title: 'Parquet Chêne Massif',
    price: 65,
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=400',
    category: 'Revêtement',
    shop_name: 'BoisPremium',
  },
]

export default function ProduitsSection() {
  return (
    <section className="py-8 sm:py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={Award}
          title="Produits du Mois"
          subtitle="Sélection de nos meilleures offres"
          link="/shops"
          color="#F97316"
        />

        {/* Scroll horizontal */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {MOCK_PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
