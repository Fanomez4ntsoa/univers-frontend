import { Link } from 'react-router-dom'
import { MapPin, Package, CheckCircle, Store } from 'lucide-react'
import type { Shop } from '../types/shop'

interface ShopCardProps {
  shop: Shop
}

export default function ShopCard({ shop }: ShopCardProps) {
  return (
    <Link to={`/shops/${shop.slug}`} className="block">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] relative">
          {shop.cover_url && <img src={shop.cover_url} alt="" className="w-full h-full object-cover" />}
          {shop.verified_at !== null && (
            <span className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1"><CheckCircle className="w-3 h-3" /></span>
          )}
        </div>
        {/* Info */}
        <div className="p-4 -mt-8">
          <div className="w-16 h-16 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm mb-2">
            {shop.logo_url ? <img src={shop.logo_url} alt={shop.name} className="w-full h-full object-contain" /> : <Store className="w-6 h-6 text-slate-400" />}
          </div>
          <h3 className="font-semibold text-slate-900 truncate">{shop.name}</h3>
          {shop.category && <p className="text-sm text-[#1E40AF] font-medium">{shop.category}</p>}
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            {shop.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{shop.city}</span>}
            <span className="flex items-center gap-1"><Package className="w-3 h-3" />{shop.products_count} produits</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
