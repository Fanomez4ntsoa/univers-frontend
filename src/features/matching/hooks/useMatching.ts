import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { batiAPI } from '../../../shared/lib/axios'
import type { ProjectRequest, RequestDetailResponse, ProjectQuoteWithRequest } from '../types/matching'

// Particulier
export const useMyRequests = () => {
  return useQuery<ProjectRequest[]>({
    queryKey: ['my-requests'],
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/matching/requests')
      return (data.data ?? data) as ProjectRequest[]
    },
  })
}

export const useRequest = (id: number | null) => {
  return useQuery<RequestDetailResponse>({
    queryKey: ['request', id],
    queryFn: async () => {
      const { data } = await batiAPI.get(`/api/matching/requests/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useCreateRequest = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<ProjectRequest>) => batiAPI.post('/api/matching/requests', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-requests'] }),
  })
}

export const useUpdateRequest = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<ProjectRequest> & { id: number }) => batiAPI.put(`/api/matching/requests/${id}`, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-requests'] }),
  })
}

export const useDeleteRequest = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.delete(`/api/matching/requests/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-requests'] }),
  })
}

export const useCloseRequest = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.post(`/api/matching/requests/${id}/close`),
    onSuccess: (_d, id) => {
      qc.invalidateQueries({ queryKey: ['my-requests'] })
      qc.invalidateQueries({ queryKey: ['request', id] })
    },
  })
}

export const useAcceptQuote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ requestId, quoteId }: { requestId: number; quoteId: number }) =>
      batiAPI.post(`/api/matching/requests/${requestId}/quotes/${quoteId}/accept`),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['request', v.requestId] })
      qc.invalidateQueries({ queryKey: ['my-requests'] })
    },
  })
}

// Artisan
export const useAvailableRequests = () => {
  return useQuery<ProjectRequest[]>({
    queryKey: ['available-requests'],
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/matching/available')
      return (data.data ?? data) as ProjectRequest[]
    },
  })
}

export const useSubmitQuote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ requestId, ...payload }: { requestId: number; price: string; estimated_days?: number; message: string }) =>
      batiAPI.post(`/api/matching/requests/${requestId}/quote`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['available-requests'] })
      qc.invalidateQueries({ queryKey: ['my-quotes'] })
    },
  })
}

export const useMyQuotes = () => {
  return useQuery<ProjectQuoteWithRequest[]>({
    queryKey: ['my-quotes'],
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/matching/my-quotes')
      return (data.data ?? data) as ProjectQuoteWithRequest[]
    },
  })
}
