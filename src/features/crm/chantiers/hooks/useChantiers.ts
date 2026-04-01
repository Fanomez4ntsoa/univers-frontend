import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { batiAPI } from '../../../../shared/lib/axios'
import type { Chantier } from '../../../../shared/types/crm'

const QUERY_KEY = ['chantiers']

interface ChantierFilters { status?: string }

export const useChantiers = (filters?: ChantierFilters) => {
  return useQuery<Chantier[]>({
    queryKey: [...QUERY_KEY, filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters?.status) params.set('status', filters.status)
      const query = params.toString()
      const { data } = await batiAPI.get(`/api/batiment/chantiers${query ? `?${query}` : ''}`)
      return data
    },
  })
}

export const useChantierPipeline = () => {
  return useQuery<Chantier[]>({
    queryKey: [...QUERY_KEY, 'pipeline'],
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/batiment/chantiers/pipeline')
      return data
    },
  })
}

export const useChantier = (id: number | null) => {
  return useQuery<Chantier>({
    queryKey: ['chantier', id],
    queryFn: async () => {
      const { data } = await batiAPI.get(`/api/batiment/chantiers/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useCreateChantier = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => batiAPI.post('/api/batiment/chantiers', payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QUERY_KEY }) },
  })
}

export const useUpdateChantier = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number } & Record<string, unknown>) => batiAPI.put(`/api/batiment/chantiers/${id}`, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QUERY_KEY }) },
  })
}

export const useDeleteChantier = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.delete(`/api/batiment/chantiers/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QUERY_KEY }) },
  })
}

export const useMoveStage = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, stage }: { id: number; stage: string }) => batiAPI.put(`/api/batiment/chantiers/${id}/move-stage`, { stage }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QUERY_KEY }) },
  })
}

export const useAddDocument = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ chantierId, formData }: { chantierId: number; formData: FormData }) =>
      batiAPI.post(`/api/batiment/chantiers/${chantierId}/documents`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    onSuccess: (_d, v) => { qc.invalidateQueries({ queryKey: ['chantier', v.chantierId] }) },
  })
}

export const useDeleteDocument = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ chantierId, docId }: { chantierId: number; docId: number }) =>
      batiAPI.delete(`/api/batiment/chantiers/${chantierId}/documents/${docId}`),
    onSuccess: (_d, v) => { qc.invalidateQueries({ queryKey: ['chantier', v.chantierId] }) },
  })
}

export const useAddComment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ chantierId, content }: { chantierId: number; content: string }) =>
      batiAPI.post(`/api/batiment/chantiers/${chantierId}/comments`, { content }),
    onSuccess: (_d, v) => { qc.invalidateQueries({ queryKey: ['chantier', v.chantierId] }) },
  })
}

export const useAddTimeEntry = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ chantierId, ...payload }: { chantierId: number; worker_name: string; hours: number; date: string; description?: string }) =>
      batiAPI.post(`/api/batiment/chantiers/${chantierId}/time-entries`, payload),
    onSuccess: (_d, v) => { qc.invalidateQueries({ queryKey: ['chantier', v.chantierId] }) },
  })
}

export const useAddCost = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ chantierId, ...payload }: { chantierId: number; description: string; amount: number; category: string; date: string }) =>
      batiAPI.post(`/api/batiment/chantiers/${chantierId}/costs`, payload),
    onSuccess: (_d, v) => { qc.invalidateQueries({ queryKey: ['chantier', v.chantierId] }) },
  })
}
