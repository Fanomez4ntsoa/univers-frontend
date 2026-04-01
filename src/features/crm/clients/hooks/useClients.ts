import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { batiAPI } from '../../../../shared/lib/axios'
import type { Client } from '../../../../shared/types/crm'

const QUERY_KEY = ['clients']

export const useClients = () => {
  return useQuery<Client[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/batiment/clients')
      return data
    },
  })
}

export const useClient = (id: number | null) => {
  return useQuery<Client>({
    queryKey: ['client', id],
    queryFn: async () => {
      const { data } = await batiAPI.get(`/api/batiment/clients/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useCreateClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Client>) =>
      batiAPI.post('/api/batiment/clients', payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<Client> & { id: number }) =>
      batiAPI.put(`/api/batiment/clients/${id}`, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: ['client', variables.id] })
    },
  })
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      batiAPI.delete(`/api/batiment/clients/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useAddNote = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ clientId, content }: { clientId: number; content: string }) =>
      batiAPI.post(`/api/batiment/clients/${clientId}/notes`, { content }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['client', variables.clientId] })
    },
  })
}

export const useGeneratePortalToken = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      batiAPI.post(`/api/batiment/clients/${id}/generate-portal-token`),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['client', id] })
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}
