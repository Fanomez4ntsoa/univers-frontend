import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { batiAPI } from '../../../../shared/lib/axios'
import type { Quote } from '../../../../shared/types/crm'

const QUERY_KEY = ['quotes']

interface QuoteFilters {
  status?: string
  client_id?: number
}

export const useQuotes = (filters?: QuoteFilters) => {
  return useQuery<Quote[]>({
    queryKey: [...QUERY_KEY, filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters?.status) params.set('status', filters.status)
      if (filters?.client_id) params.set('client_id', String(filters.client_id))
      const query = params.toString()
      const { data } = await batiAPI.get(`/api/batiment/quotes${query ? `?${query}` : ''}`)
      return data
    },
  })
}

export const useQuote = (id: number | null) => {
  return useQuery<Quote>({
    queryKey: ['quote', id],
    queryFn: async () => {
      const { data } = await batiAPI.get(`/api/batiment/quotes/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useCreateQuote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      batiAPI.post('/api/batiment/quotes', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useUpdateQuote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number } & Record<string, unknown>) =>
      batiAPI.put(`/api/batiment/quotes/${id}`, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useDeleteQuote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.delete(`/api/batiment/quotes/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useSendQuote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.post(`/api/batiment/quotes/${id}/send`),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useSignQuote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number; signature_image: string; signed_by: string; signed_at: string }) =>
      batiAPI.post(`/api/batiment/quotes/${id}/sign`, payload),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: QUERY_KEY })
      qc.invalidateQueries({ queryKey: ['quote', v.id] })
    },
  })
}

export const useDuplicateQuote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.post(`/api/batiment/quotes/${id}/duplicate`),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useConvertToInvoice = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.post(`/api/batiment/quotes/${id}/convert-invoice`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY })
      qc.invalidateQueries({ queryKey: ['invoices'] })
    },
  })
}
