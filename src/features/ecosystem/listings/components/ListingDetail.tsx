import { ArrowLeft, MapPin, Eye, Calendar, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'
import { requireAuth } from '../../../../shared/lib/requireAuth'
import type { Listing } from '../types/listing'
import { PRICE_TYPE_CONFIG, CONDITION_CONFIG } from '../types/listing'

interface ListingDetailProps { listing: Listing }

function fmt(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n || 0)
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ListingDetail({ listing }: ListingDetailProps) {
  if (!listing) return null
  const priceType = PRICE_TYPE_CONFIG[listing.price_type]
  const condition = CONDITION_CONFIG[listing.condition]

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/listings"><Button variant="ghost" size="icon" className="cursor-pointer"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <h1 className="text-2xl font-bold text-slate-900 flex-1">{listing.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Images */}
        <div className="lg:col-span-2">
          <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden">
            {(listing.image_urls ?? []).length > 0 ? (
              <img src={listing.image_urls[0]} alt={listing.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">Pas d'image</div>
            )}
          </div>
          {listing.description && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 mt-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Description</h3>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{listing.description}</p>
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-2xl font-bold text-[#1E40AF] mb-2">{listing.price_type === 'free' ? 'Gratuit' : fmt(listing.price)}</div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full ${priceType.color}`}>{priceType.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${condition.color}`}>{condition.label}</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              {listing.city && <p className="flex items-center gap-2"><MapPin className="w-4 h-4" />{listing.city}{listing.postal_code ? ` (${listing.postal_code})` : ''}</p>}
              <p className="flex items-center gap-2"><Eye className="w-4 h-4" />{listing.views_count} vues</p>
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4" />{fmtDate(listing.created_at)}</p>
            </div>
          </div>

          {listing.seller && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Vendeur</h3>
              <Link to={`/profile/${listing.seller.id}`} className="flex items-center gap-3 hover:bg-slate-50 rounded-lg p-2 -m-2">
                <div className="w-10 h-10 rounded-full bg-[#1E40AF]/10 flex items-center justify-center">
                  {listing.seller.avatar_url ? (
                    <img src={listing.seller.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-[#1E40AF] font-semibold">{listing.seller.display_name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{listing.seller.display_name}</p>
                  <p className="text-xs text-slate-400">@{listing.seller.username}</p>
                </div>
              </Link>
              <Button
                onClick={() => requireAuth(() => { /* TODO: messaging */ })}
                className="w-full mt-3 bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Contacter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
