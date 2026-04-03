import { Link } from 'react-router-dom'
import { MapPin, Eye, Package } from 'lucide-react'
import type { Listing } from '../types/listing'
import { PRICE_TYPE_CONFIG, CONDITION_CONFIG } from '../types/listing'

interface ListingCardProps { listing: Listing }

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n || 0)
}

export default function ListingCard({ listing }: ListingCardProps) {
  const priceType = PRICE_TYPE_CONFIG[listing.price_type]
  const condition = CONDITION_CONFIG[listing.condition]

  return (
    <Link to={`/listings/${listing.id}`} className="block">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <div className="aspect-square bg-slate-100 flex items-center justify-center relative">
          {(listing.image_urls ?? []).length > 0 ? (
            <img src={listing.image_urls[0]} alt={listing.title} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-10 h-10 text-slate-300" />
          )}
          <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full ${condition.color}`}>{condition.label}</span>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-slate-900 text-sm line-clamp-2">{listing.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-[#1E40AF]">{listing.price_type === 'free' ? 'Gratuit' : fmt(listing.price)}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${priceType.color}`}>{priceType.label}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
            {listing.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.city}</span>}
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{listing.views_count}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
