import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ecosystemAPI, batiAPI } from '../../../../shared/lib/axios'
import type { Event } from '../types/job'

interface EventFilters { event_type?: string; city?: string }

export const useEvents = (filters?: EventFilters) => {
  return useQuery<Event[]>({
    queryKey: ['events', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters?.event_type) params.set('event_type', filters.event_type)
      if (filters?.city) params.set('city', filters.city)
      const query = params.toString()
      const { data } = await ecosystemAPI.get(`/api/ecosystem/events${query ? `?${query}` : ''}`)
      return (data.data ?? data) as Event[]
    },
  })
}

export const useEvent = (id: number | null) => {
  return useQuery<Event>({
    queryKey: ['event', id],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get(`/api/ecosystem/events/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useCreateEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Event>) => batiAPI.post('/api/ecosystem/events', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
}

export const useUpdateEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<Event> & { id: number }) => batiAPI.put(`/api/ecosystem/events/${id}`, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
}

export const useDeleteEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.delete(`/api/ecosystem/events/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
}

export const useAttendEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.post(`/api/ecosystem/events/${id}/attend`),
    onSuccess: (_d, id) => {
      qc.invalidateQueries({ queryKey: ['event', id] })
      qc.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
