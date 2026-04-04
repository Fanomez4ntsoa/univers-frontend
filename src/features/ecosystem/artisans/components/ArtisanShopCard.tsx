// ArtisanShopCard.tsx — Fidèle à Emergent ShopCard dans ArtisansPage.jsx
// Lit les champs Shop de l'API : name, category, city, cover_url, logo_url, is_verified

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, CheckCircle, MapPin, Phone, Info } from 'lucide-react'
import { IS_DEMO } from '../../../../shared/lib/config'
import type { ArtisanShop } from '../types/artisan'

export default function ArtisanShopCard({ shop, index }: { shop: ArtisanShop; index: number }) {
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
        {shop.cover_url ? (
          <img
            src={shop.cover_url}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2F4EA2] to-[#1E40AF]" />
        )}

        {/* Badge TEST — mode démo */}
        {IS_DEMO && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
            <Info size={12} />
            TEST
          </div>
        )}

        {/* Badge vérifié */}
        {shop.verified_at !== null && (
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
          {shop.logo_url ? (
            <img src={shop.logo_url} alt={shop.name} className="w-full h-full object-cover" />
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
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#F97316] transition-colors">{shop.name}</h3>
            <p className="text-[#1E40AF] font-semibold text-sm">{shop.category}</p>
          </div>
        </div>

        {shop.city && (
          <div className="flex items-center gap-1.5 text-gray-500 mt-3">
            <MapPin size={15} />
            <span className="text-sm font-medium">{shop.city}</span>
          </div>
        )}

        {shop.description && (
          <p className="text-gray-600 text-sm mt-3 line-clamp-2 leading-relaxed">{shop.description}</p>
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
          {shop.user?.phone && (
            <motion.a
              href={`tel:${shop.user.phone}`}
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
