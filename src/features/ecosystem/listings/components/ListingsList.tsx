import { useState } from 'react'
import { Search, ShoppingBag } from 'lucide-react'
import { Input } from '../../../../shared/ui/input'
import type { Listing, PriceType } from '../types/listing'
import { PRICE_TYPE_CONFIG } from '../types/listing'
import ListingCard from './ListingCard'

interface ListingsListProps { listings: Listing[] }

export default function ListingsList({ listings }: ListingsListProps) {
  const [search, setSearch] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)

  const filtered = (listings ?? []).filter((l) => {
    const q = search.toLowerCase()
    const matchesSearch = l.title.toLowerCase().includes(q) || l.city?.toLowerCase().includes(q)
    const matchesPrice = !priceFilter || l.price_type === priceFilter
    const matchesCategory = !categoryFilter || l.category === categoryFilter
    const matchesCity = !cityFilter || l.city?.toLowerCase().includes(cityFilter.toLowerCase())
    return matchesSearch && matchesPrice && matchesCategory && matchesCity
  })

  const visible = filtered.slice(0, visibleCount)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une annonce..." className="pl-10 h-11 rounded-xl" />
        </div>
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
          <option value="">Tous les prix</option>
          {(Object.entries(PRICE_TYPE_CONFIG) as [PriceType, { label: string }][]).map(([v, { label }]) => (
            <option key={v} value={v}>{label}</option>
          ))}
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
          <option value="">Toutes catégories</option>
          <option value="materiaux">Matériaux</option>
          <option value="outils">Outils</option>
          <option value="equipements">Équipements</option>
          <option value="surplus_chantier">Surplus chantier</option>
          <option value="occasion">Occasion</option>
        </select>
        <Input value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} placeholder="Ville..." className="h-11 rounded-xl max-w-[160px]" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Aucune annonce trouvée</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {visible.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
          {visibleCount < filtered.length && (
            <div className="text-center">
              <button onClick={() => setVisibleCount((v) => v + 12)} className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Charger plus</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
