// ArtisanShopCard.tsx — Fidèle à Emergent ShopCard dans ArtisansPage.jsx
// Cover 136px, logo 80x80 overlap, bouton orange #E8650A + bouton tel

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, CheckCircle, Star, MapPin, Phone, Info } from 'lucide-react'
import type { Artisan } from '../types/artisan'

export default function ArtisanShopCard({ shop, index }: { shop: Artisan; index: number }) {
  const isTest = shop.id?.startsWith('artisan-')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-2xl overflow-hidden group relative"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
    >
      {/* Cover Image */}
      <div className="h-36 relative overflow-hidden">
        {shop.cover_image ? (
          <img
            src={shop.cover_image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2F4EA2] to-[#1E40AF]" />
        )}

        {isTest && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
            <Info size={12} />
            TEST
          </div>
        )}

        {shop.is_verified && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg"
          >
            <CheckCircle size={14} />
            Vérifié
          </motion.div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Logo */}
      <div className="relative px-5 -mt-10">
        <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border-4 border-white overflow-hidden">
          {shop.logo ? (
            <img src={shop.logo} alt={shop.shop_name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Building2 size={32} className="text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 pt-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#F97316] transition-colors">{shop.shop_name}</h3>
            <p className="text-[#1E40AF] font-semibold text-sm">{shop.metier}</p>
          </div>

          {shop.reviews_count > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span className="font-bold text-gray-900">{shop.rating_average?.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({shop.reviews_count})</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 mt-3">
          <MapPin size={15} />
          <span className="text-sm font-medium">{shop.city}{shop.postal_code && ` (${shop.postal_code})`}</span>
        </div>

        {shop.description && (
          <p className="text-gray-600 text-sm mt-3 line-clamp-2 leading-relaxed">{shop.description}</p>
        )}

        {shop.services && shop.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {shop.services.slice(0, 3).map((service, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                {service}
              </span>
            ))}
            {shop.services.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">+{shop.services.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 mt-5">
          <Link to={`/artisans/${shop.slug || shop.id}`} className="flex-1">
            <motion.div
              className="w-full py-3 rounded-xl text-center font-semibold text-white text-sm"
              style={{ background: '#E8650A' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Voir le profil
            </motion.div>
          </Link>
          {shop.phone && (
            <motion.a
              href={`tel:${shop.phone}`}
              className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={20} className="text-gray-600" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
