import { ArrowLeft, MapPin, Phone, Mail, CheckCircle, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'
import type { Shop, ShopProduct } from '../types/shop'
import ProductCard from './ProductCard'

interface ShopDetailProps {
  shop: Shop
  products: ShopProduct[]
}

export default function ShopDetail({ shop, products }: ShopDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/shops"><Button variant="ghost" size="icon" className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{shop.name}</h1>
            {shop.is_verified && <CheckCircle className="w-5 h-5 text-green-500" />}
          </div>
          {shop.category && <p className="text-sm text-[#1E40AF] font-medium">{shop.category}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden mx-auto">
              {shop.logo_url ? <img src={shop.logo_url} alt={shop.name} className="w-full h-full object-contain" /> : <Store className="w-8 h-8 text-slate-400" />}
            </div>
            {shop.description && <p className="text-sm text-slate-600 text-center">{shop.description}</p>}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {shop.city && <p className="flex items-center gap-2 text-sm text-slate-600"><MapPin className="w-4 h-4" />{shop.address ? `${shop.address}, ` : ''}{shop.city}</p>}
              {shop.phone && <a href={`tel:${shop.phone}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#1E40AF]"><Phone className="w-4 h-4" />{shop.phone}</a>}
              {shop.email && <a href={`mailto:${shop.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#1E40AF]"><Mail className="w-4 h-4" />{shop.email}</a>}
            </div>
          </div>
        </div>

        {/* Right — Products */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Produits ({(products ?? []).length})</h2>
          {(products ?? []).length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-400">Aucun produit dans cette boutique</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(products ?? []).map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
