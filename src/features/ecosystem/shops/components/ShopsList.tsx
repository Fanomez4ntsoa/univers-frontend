import { useState } from 'react'
import { Search, Store } from 'lucide-react'
import { Input } from '../../../../shared/ui/input'
import type { Shop } from '../types/shop'
import ShopCard from './ShopCard'

interface ShopsListProps {
  shops: Shop[]
}

export default function ShopsList({ shops }: ShopsListProps) {
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)

  const filtered = (shops ?? []).filter((s) => {
    const q = search.toLowerCase()
    return s.name.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q) || s.city?.toLowerCase().includes(q)
  })

  const visible = filtered.slice(0, visibleCount)

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une boutique, un métier, une ville..." className="pl-10 h-11 rounded-xl" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Store className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Aucune boutique trouvée</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((shop) => <ShopCard key={shop.id} shop={shop} />)}
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
