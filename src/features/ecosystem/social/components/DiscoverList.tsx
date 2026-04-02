import { useState } from 'react'
import { Search, Compass } from 'lucide-react'
import { Input } from '../../../../shared/ui/input'
import type { DiscoverUser } from '../types/social'
import ArtisanCard from './ArtisanCard'

interface DiscoverListProps {
  users: DiscoverUser[]
}

export default function DiscoverList({ users }: DiscoverListProps) {
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)

  const filtered = (users ?? []).filter((u) => {
    const q = search.toLowerCase()
    return u.display_name.toLowerCase().includes(q) ||
      u.metier?.toLowerCase().includes(q) ||
      u.city?.toLowerCase().includes(q)
  })

  const visible = filtered.slice(0, visibleCount)

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un artisan, un métier, une ville..." className="pl-10 h-11 rounded-xl" />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Aucun artisan trouvé</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((user) => (
              <ArtisanCard key={user.id} user={user} />
            ))}
          </div>
          {visibleCount < filtered.length && (
            <div className="text-center">
              <button onClick={() => setVisibleCount((v) => v + 12)} className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Charger plus
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
