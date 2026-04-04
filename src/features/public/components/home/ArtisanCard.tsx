import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MapPin, ArrowRight, BadgeCheck } from 'lucide-react'

interface Artisan {
  id: string
  shop_name: string
  metier: string
  city: string
  rating_average: number
  is_verified: boolean
  cover_image: string
  logo: string
  description?: string
}

export default function ArtisanCard({ shop, index }: { shop: Artisan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#10B981]/30 transition-all hover:shadow-xl w-[280px] sm:w-auto flex-shrink-0"
    >
      {/* Cover */}
      <div className="relative h-24 sm:h-32 overflow-hidden">
        <img
          src={shop.cover_image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400'}
          alt={shop.shop_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badge verifie */}
        {shop.is_verified && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-emerald-500 rounded-full flex items-center gap-1">
            <BadgeCheck size={10} className="text-white" />
            <span className="text-[9px] font-semibold text-white">Vérifié</span>
          </div>
        )}

        {/* Logo */}
        <div className="absolute -bottom-5 left-3">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl border-2 border-white overflow-hidden shadow-lg">
            <img
              src={shop.logo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Rating sur l'image mobile */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 px-1.5 py-0.5 rounded-full">
          <Star size={10} className="text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-bold text-yellow-700">{shop.rating_average?.toFixed(1) || '5.0'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-6 sm:pt-8 pb-3 sm:pb-4 px-3 sm:px-4">
        <div className="flex items-start justify-between mb-1 sm:mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#10B981] transition-colors truncate">
              {shop.shop_name}
            </h3>
            <p className="text-xs sm:text-sm text-[#F97316] font-medium truncate">{shop.metier}</p>
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1 sm:line-clamp-2 mb-2 sm:mb-3">{shop.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin size={11} className="sm:w-3 sm:h-3" />
            <span className="text-[10px] sm:text-xs">{shop.city}</span>
          </div>
          <Link
            to={`/artisans/${shop.id}`}
            className="text-[10px] sm:text-xs font-semibold text-[#10B981] hover:underline flex items-center gap-0.5"
          >
            Voir <ArrowRight size={10} className="sm:w-3 sm:h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export type { Artisan }
