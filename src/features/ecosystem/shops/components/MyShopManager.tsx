import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../shared/ui/tabs'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import { useMyShop, useMyProducts, useDeleteProduct } from '../hooks/useShops'
import type { ShopProduct } from '../types/shop'
import MyShopForm from './MyShopForm'
import ProductForm from './ProductForm'
import ProductCard from './ProductCard'
import PageSkeleton from '../../../../shared/components/PageSkeleton'

export default function MyShopManager() {
  const { data: shop, isLoading: shopLoading } = useMyShop()
  const { data: products, isLoading: productsLoading } = useMyProducts()
  const deleteMutation = useDeleteProduct()

  const [productFormOpen, setProductFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null)

  if (shopLoading || productsLoading) return <PageSkeleton />
  if (!shop) return <div className="text-center py-16"><p className="text-red-500">Erreur lors du chargement</p></div>

  const handleDeleteProduct = (id: number) => {
    if (!confirm('Supprimer ce produit ?')) return
    deleteMutation.mutate(id, { onSuccess: () => toast.success('Produit supprimé'), onError: () => toast.error('Erreur') })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="shop" className="w-full">
        <TabsList>
          <TabsTrigger value="shop">Ma boutique</TabsTrigger>
          <TabsTrigger value="products">Mes produits ({(products ?? []).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="shop" className="mt-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <MyShopForm shop={shop} />
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { setEditingProduct(null); setProductFormOpen(true) }} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              <Plus className="w-5 h-5 mr-2" /> Nouveau produit
            </Button>
          </div>
          {(products ?? []).length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-400">Aucun produit — crée ton premier produit</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(products ?? []).map((p) => (
                <div key={p.id} className="relative group">
                  <ProductCard product={p} />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button variant="ghost" size="icon-xs" onClick={() => { setEditingProduct(p); setProductFormOpen(true) }} className="bg-white shadow-sm"><Edit className="w-3 h-3" /></Button>
                    <Button variant="ghost" size="icon-xs" onClick={() => handleDeleteProduct(p.id)} className="bg-white shadow-sm text-red-500"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <ProductForm open={productFormOpen} onClose={() => setProductFormOpen(false)} product={editingProduct} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
