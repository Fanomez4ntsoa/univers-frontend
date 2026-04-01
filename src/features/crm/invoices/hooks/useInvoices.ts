import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { batiAPI } from '../../../../shared/lib/axios'
import type { Invoice } from '../../../../shared/types/crm'

const QUERY_KEY = ['invoices']

interface InvoiceFilters {
  status?: string
  client_id?: number
}

export const useInvoices = (filters?: InvoiceFilters) => {
  return useQuery<Invoice[]>({
    queryKey: [...QUERY_KEY, filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters?.status) params.set('status', filters.status)
      if (filters?.client_id) params.set('client_id', String(filters.client_id))
      const query = params.toString()
      const { data } = await batiAPI.get(`/api/batiment/invoices${query ? `?${query}` : ''}`)
      return data
    },
  })
}

export const useInvoice = (id: number | null) => {
  return useQuery<Invoice>({
    queryKey: ['invoice', id],
    queryFn: async () => {
      const { data } = await batiAPI.get(`/api/batiment/invoices/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useCreateInvoice = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      batiAPI.post('/api/batiment/invoices', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useUpdateInvoice = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number } & Record<string, unknown>) =>
      batiAPI.put(`/api/batiment/invoices/${id}`, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useDeleteInvoice = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.delete(`/api/batiment/invoices/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useSendInvoice = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.post(`/api/batiment/invoices/${id}/send`),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useMarkPaid = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number; payment_date: string; payment_method: string }) =>
      batiAPI.post(`/api/batiment/invoices/${id}/mark-paid`, payload),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: QUERY_KEY })
      qc.invalidateQueries({ queryKey: ['invoice', v.id] })
    },
  })
}

export const useCancelInvoice = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.post(`/api/batiment/invoices/${id}/cancel`),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
