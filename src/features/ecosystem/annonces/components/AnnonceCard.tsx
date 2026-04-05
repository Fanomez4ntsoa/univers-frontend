// AnnonceCard.tsx — Fidèle à Emergent AnnonceCard dans PetitesAnnoncesPage.jsx
// Layout horizontal flex, image carrée, prix orange, ville + date

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, MapPin, Clock, Info } from 'lucide-react'
import { IS_DEMO } from '../../../../shared/lib/config'
import type { Annonce } from '../hooks/useAnnonces'

function formatPrice(price: string) {
  const num = parseFloat(price)
  if (isNaN(num)) return 'Prix non défini'
  return num.toLocaleString('fr-FR') + ' €'
}

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `il y a ${minutes}min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `il y a ${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 30) return `il y a ${days}j`
  return `il y a ${Math.floor(days / 30)} mois`
}

function conditionLabel(c: string | null) {
  if (!c) return null
  const map: Record<string, string> = { new: 'Neuf', used: 'Occasion', refurbished: 'Reconditionné' }
  return map[c] || c
}

export default function AnnonceCard({ annonce, index }: { annonce: Annonce; index: number }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer group relative"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
      onClick={() => navigate(`/listings/${annonce.id}`)}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
    >
      <div className="flex">
        {/* Image */}
        <div className="relative w-36 sm:w-44 flex-shrink-0">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
            {annonce.images && annonce.images.length > 0 ? (
              <img
                src={annonce.images[0]}
                alt={annonce.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera size={32} className="text-gray-300" />
              </div>
            )}
          </div>

          {IS_DEMO && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-md">
              <Info size={10} />
              TEST
            </div>
          )}

          {annonce.images && annonce.images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
              <Camera size={12} />
              {annonce.images.length}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-[15px] mb-1">
              {annonce.title}
            </h3>

            <p className="text-[#F97316] font-bold text-xl mb-2">
              {formatPrice(annonce.price)}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {annonce.condition && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  {conditionLabel(annonce.condition)}
                </span>
              )}
              {annonce.price_type === 'negotiable' && (
                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-xs">
                  Négociable
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>{annonce.city || 'Non précisé'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{formatTimeAgo(annonce.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
