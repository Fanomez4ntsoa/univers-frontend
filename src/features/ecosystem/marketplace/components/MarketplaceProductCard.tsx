// MarketplaceProductCard.tsx — Fidèle à Emergent ProductCard
// Affiche les vrais produits : image, nom, prix, catégorie, vendeur, stock

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, MapPin, Info } from 'lucide-react'
import { IS_DEMO } from '../../../../shared/lib/config'
import type { MarketplaceProduct } from '../hooks/useMarketplace'

export default function MarketplaceProductCard({ product, index }: { product: MarketplaceProduct; index: number }) {
  const imageUrl = product.images?.[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="bg-white rounded-xl overflow-hidden group"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Image */}
      <div className="relative h-36 sm:h-44 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Package size={40} className="text-gray-300" />
          </div>
        )}

        {IS_DEMO && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Info size={10} />
            TEST
          </div>
        )}

        {/* Stock badge */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold">
            Plus que {product.stock}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-[#F97316] transition-colors leading-tight">
          {product.name}
        </h3>

        {product.category && (
          <p className="text-[#1E40AF] text-xs font-medium mt-1">{product.category}</p>
        )}

        {/* Prix */}
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-lg font-bold text-gray-900">{parseFloat(product.price).toFixed(0)}€</span>
        </div>

        {/* Vendeur */}
        <div className="flex items-center gap-1 text-gray-400 mt-1.5">
          <span className="text-xs">par</span>
          <Link to={`/shops/${product.shop_slug}`} className="text-xs font-medium text-[#1E40AF] hover:underline">
            {product.shop_name}
          </Link>
        </div>

        {product.shop_city && (
          <div className="flex items-center gap-1 text-gray-400 mt-1">
            <MapPin size={11} />
            <span className="text-[10px]">{product.shop_city}</span>
          </div>
        )}

        {/* Stock */}
        <div className="mt-2">
          {product.stock > 0 ? (
            <span className="text-xs text-emerald-600 font-medium">En stock</span>
          ) : (
            <span className="text-xs text-red-500 font-medium">Rupture de stock</span>
          )}
        </div>

        <Link to={`/shops/${product.shop_slug}`} className="block mt-3">
          <motion.div
            className="w-full py-2.5 rounded-lg text-center font-semibold text-white text-xs sm:text-sm"
            style={{ background: '#E8650A' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Voir le produit
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}
