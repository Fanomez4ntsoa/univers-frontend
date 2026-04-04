// ConversionBannerMarketplace.tsx — Fidèle à Emergent UniversalBanner variant="marketplace"
// Bandeau bleu #EEF2FF + border-left orange #E8650A

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ConversionBannerMarketplace() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full py-4"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div
          className="relative overflow-hidden rounded-2xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6"
          style={{
            backgroundColor: '#EEF2FF',
            borderLeft: '4px solid #E8650A',
          }}
        >
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 pl-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg lg:text-xl leading-tight mb-1" style={{ color: '#0F172A' }}>
                Ouvre ta boutique en ligne
              </h3>
              <p className="text-sm lg:text-base leading-relaxed mb-1" style={{ color: '#374151' }}>
                Vends tes produits sans commission, directement à tes clients
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ✓ 0% commission · ✓ Gratuit pendant la Beta
              </p>
            </div>
            <Link to="/register" className="flex-shrink-0 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto h-11 sm:h-10 px-5 lg:px-6 text-white font-semibold text-sm rounded-[10px] flex items-center justify-center gap-1 transition-all duration-200"
                style={{ backgroundColor: '#1a2a4a', boxShadow: '0 4px 12px rgba(26,42,74,0.25)' }}
              >
                Ouvrir ma boutique ›
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
