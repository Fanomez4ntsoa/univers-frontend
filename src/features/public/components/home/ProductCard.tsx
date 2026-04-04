import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface Product {
  id: string
  title: string
  price: number
  image: string
  category: string
  shop_name?: string
}

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#1E40AF]/20 hover:shadow-lg transition-all w-[150px] sm:w-auto flex-shrink-0"
    >
      <div className="relative h-24 sm:h-36 overflow-hidden">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-1.5 right-1.5 w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={12} className="text-gray-600 sm:w-4 sm:h-4" />
        </button>
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="font-medium text-gray-900 text-[11px] sm:text-sm line-clamp-1 mb-0.5 sm:mb-1">{product.title}</h3>
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#1E40AF] text-xs sm:text-base">{product.price?.toFixed(0)}€</span>
          <span className="text-[9px] sm:text-xs text-gray-400 hidden sm:block">{product.shop_name}</span>
        </div>
      </div>
    </motion.div>
  )
}

export type { Product }
