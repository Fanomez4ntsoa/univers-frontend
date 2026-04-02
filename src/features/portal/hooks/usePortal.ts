import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { portalAPI } from '../../../shared/lib/axios'
import type { PortalDashboard, PortalQuote, PortalInvoice } from '../types/portal'

export const usePortalDashboard = (token: string) => {
  return useQuery<PortalDashboard>({
    queryKey: ['portal', token],
    queryFn: async () => {
      const { data } = await portalAPI.get(`/api/portal/${token}`)
      return data
    },
    enabled: !!token,
  })
}

export const usePortalQuotes = (token: string) => {
  return useQuery<PortalQuote[]>({
    queryKey: ['portal', token, 'quotes'],
    queryFn: async () => {
      const { data } = await portalAPI.get(`/api/portal/${token}/quotes`)
      return data
    },
    enabled: !!token,
  })
}

export const usePortalQuote = (token: string, id: number | null) => {
  return useQuery<PortalQuote>({
    queryKey: ['portal', token, 'quote', id],
    queryFn: async () => {
      const { data } = await portalAPI.get(`/api/portal/${token}/quotes/${id}`)
      return data
    },
    enabled: !!token && !!id,
  })
}

export const useSignPortalQuote = (token: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ quoteId, ...payload }: { quoteId: number; signature_image: string; signed_by: string; signed_at: string }) =>
      portalAPI.post(`/api/portal/${token}/quotes/${quoteId}/sign`, payload),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['portal', token, 'quote', v.quoteId] })
      qc.invalidateQueries({ queryKey: ['portal', token, 'quotes'] })
      qc.invalidateQueries({ queryKey: ['portal', token] })
    },
  })
}

export const usePortalInvoices = (token: string) => {
  return useQuery<PortalInvoice[]>({
    queryKey: ['portal', token, 'invoices'],
    queryFn: async () => {
      const { data } = await portalAPI.get(`/api/portal/${token}/invoices`)
      return data
    },
    enabled: !!token,
  })
}

export const usePortalInvoice = (token: string, id: number | null) => {
  return useQuery<PortalInvoice>({
    queryKey: ['portal', token, 'invoice', id],
    queryFn: async () => {
      const { data } = await portalAPI.get(`/api/portal/${token}/invoices/${id}`)
      return data
    },
    enabled: !!token && !!id,
  })
}
