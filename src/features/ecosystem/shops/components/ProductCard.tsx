import { Package } from 'lucide-react'
import type { ShopProduct } from '../types/shop'

interface ProductCardProps {
  product: ShopProduct
}

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0)
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="aspect-square bg-slate-100 flex items-center justify-center">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Package className="w-10 h-10 text-slate-300" />
        )}
      </div>
      <div className="p-3">
        <h4 className="font-medium text-slate-900 text-sm truncate">{product.name}</h4>
        <div className="flex items-center justify-between mt-1">
          <span className="font-bold text-[#1E40AF]">{fmt(product.price)}</span>
          <span className={`text-xs ${product.stock > 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
          </span>
        </div>
      </div>
    </div>
  )
}
