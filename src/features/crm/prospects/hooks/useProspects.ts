import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { batiAPI } from '../../../../shared/lib/axios'
import type { Prospect } from '../types/prospect'

const QUERY_KEY = ['prospects']

export const useProspects = () => {
  return useQuery<Prospect[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/batiment/prospects')
      return data
    },
  })
}

export const useCreateProspect = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Prospect>) =>
      batiAPI.post('/api/batiment/prospects', payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useUpdateProspect = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<Prospect> & { id: number }) =>
      batiAPI.put(`/api/batiment/prospects/${id}`, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useDeleteProspect = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      batiAPI.delete(`/api/batiment/prospects/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export const useConvertProspect = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      batiAPI.post(`/api/batiment/prospects/${id}/convert-to-client`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
