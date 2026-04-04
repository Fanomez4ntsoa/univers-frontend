import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Timer } from 'lucide-react'

interface FlashProduct {
  id: string
  title: string
  price: number
  flash_price: number
  image: string
  category: string
}

export default function FlashProductCard({ product, index }: { product: FlashProduct; index: number }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const discount = product.flash_price ? Math.round((1 - product.flash_price / product.price) * 100) : 30

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all group w-[180px] sm:w-auto flex-shrink-0"
    >
      {/* Badge promo */}
      <div className="absolute top-2 left-2 z-10 px-1.5 py-0.5 bg-red-500 rounded-full flex items-center gap-0.5">
        <Zap size={10} className="text-white" />
        <span className="text-[10px] font-bold text-white">-{discount}%</span>
      </div>

      {/* Timer */}
      <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-0.5">
        <Timer size={10} className="text-red-400" />
        <span className="text-[9px] font-mono text-white">
          {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-28 sm:h-40 overflow-hidden">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-2 sm:p-4">
        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-1 sm:line-clamp-2 mb-1 sm:mb-2 group-hover:text-[#1E40AF]">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-1 sm:gap-2">
          <span className="text-base sm:text-xl font-bold text-red-600">
            {product.flash_price.toFixed(0)}€
          </span>
          <span className="text-[10px] sm:text-sm text-gray-400 line-through">
            {product.price.toFixed(0)}€
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export type { FlashProduct }
