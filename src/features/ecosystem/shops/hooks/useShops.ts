import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ecosystemAPI } from '../../../../shared/lib/axios'
import { batiAPI } from '../../../../shared/lib/axios'
import type { Shop, ShopProduct, MyShop } from '../types/shop'

export const useShops = () => {
  return useQuery<Shop[]>({
    queryKey: ['shops'],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get('/api/ecosystem/shops')
      return (data.data ?? data) as Shop[]
    },
  })
}

export const useShop = (slug: string | undefined) => {
  return useQuery<Shop & { products: ShopProduct[] }>({
    queryKey: ['shop', slug],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get(`/api/ecosystem/shops/${slug}`)
      return data
    },
    enabled: !!slug,
  })
}

export const useMyShop = () => {
  const token = localStorage.getItem('token')
  return useQuery<MyShop>({
    queryKey: ['my-shop'],
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/ecosystem/shop')
      return data
    },
    enabled: !!token,
  })
}

export const useUpdateMyShop = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<MyShop>) =>
      batiAPI.put('/api/ecosystem/shop', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-shop'] }),
  })
}

export const useMyProducts = () => {
  const token = localStorage.getItem('token')
  return useQuery<ShopProduct[]>({
    queryKey: ['my-products'],
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/ecosystem/shop/products')
      return (data.data ?? data) as ShopProduct[]
    },
    enabled: !!token,
  })
}

export const useCreateProduct = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<ShopProduct>) =>
      batiAPI.post('/api/ecosystem/shop/products', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-products'] }),
  })
}

export const useUpdateProduct = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<ShopProduct> & { id: number }) =>
      batiAPI.put(`/api/ecosystem/shop/products/${id}`, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-products'] }),
  })
}

export const useDeleteProduct = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      batiAPI.delete(`/api/ecosystem/shop/products/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-products'] }),
  })
}
