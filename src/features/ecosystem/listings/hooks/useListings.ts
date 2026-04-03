import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ecosystemAPI, batiAPI } from '../../../../shared/lib/axios'
import type { Listing } from '../types/listing'

interface ListingFilters { category?: string; city?: string; price_type?: string }

export const useListings = (filters?: ListingFilters) => {
  return useQuery<Listing[]>({
    queryKey: ['listings', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters?.category) params.set('category', filters.category)
      if (filters?.city) params.set('city', filters.city)
      if (filters?.price_type) params.set('price_type', filters.price_type)
      const query = params.toString()
      const { data } = await ecosystemAPI.get(`/api/ecosystem/listings${query ? `?${query}` : ''}`)
      return (data.data ?? data) as Listing[]
    },
  })
}

export const useListing = (id: number | null) => {
  return useQuery<Listing>({
    queryKey: ['listing', id],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get(`/api/ecosystem/listings/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useMyListings = () => {
  const token = localStorage.getItem('token')
  return useQuery<Listing[]>({
    queryKey: ['my-listings'],
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/ecosystem/listings/my')
      return (data.data ?? data) as Listing[]
    },
    enabled: !!token,
  })
}

export const useCreateListing = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Listing>) =>
      batiAPI.post('/api/ecosystem/listings', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-listings'] })
      qc.invalidateQueries({ queryKey: ['listings'] })
    },
  })
}

export const useUpdateListing = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<Listing> & { id: number }) =>
      batiAPI.put(`/api/ecosystem/listings/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-listings'] })
      qc.invalidateQueries({ queryKey: ['listings'] })
    },
  })
}

export const useDeleteListing = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.delete(`/api/ecosystem/listings/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-listings'] })
      qc.invalidateQueries({ queryKey: ['listings'] })
    },
  })
}

export const useMarkSold = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.post(`/api/ecosystem/listings/${id}/sold`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-listings'] })
      qc.invalidateQueries({ queryKey: ['listings'] })
    },
  })
}
