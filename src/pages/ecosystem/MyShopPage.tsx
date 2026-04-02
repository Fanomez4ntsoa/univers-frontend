import { Store } from 'lucide-react'
import MyShopManager from '../../features/ecosystem/shops/components/MyShopManager'

export default function MyShopPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Store className="w-6 h-6 text-[#1E40AF]" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ma boutique</h1>
          <p className="text-slate-500 text-sm">Gère ta boutique et tes produits</p>
        </div>
      </div>
      <MyShopManager />
    </div>
  )
}
