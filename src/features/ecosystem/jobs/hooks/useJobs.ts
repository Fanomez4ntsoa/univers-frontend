import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ecosystemAPI, batiAPI } from '../../../../shared/lib/axios'
import type { Job, JobApplication } from '../types/job'

interface JobFilters { contract_type?: string; city?: string; metier?: string }

export const useJobs = (filters?: JobFilters) => {
  return useQuery<Job[]>({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters?.contract_type) params.set('contract_type', filters.contract_type)
      if (filters?.city) params.set('city', filters.city)
      if (filters?.metier) params.set('metier', filters.metier)
      const query = params.toString()
      const { data } = await ecosystemAPI.get(`/api/ecosystem/jobs${query ? `?${query}` : ''}`)
      return (data.data ?? data) as Job[]
    },
  })
}

export const useJob = (id: number | null) => {
  return useQuery<Job>({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get(`/api/ecosystem/jobs/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useCreateJob = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Job>) => batiAPI.post('/api/ecosystem/jobs', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  })
}

export const useUpdateJob = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<Job> & { id: number }) => batiAPI.put(`/api/ecosystem/jobs/${id}`, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  })
}

export const useDeleteJob = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => batiAPI.delete(`/api/ecosystem/jobs/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  })
}

export const useApplyJob = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ jobId, ...payload }: { jobId: number; message: string; email: string; phone?: string }) =>
      batiAPI.post(`/api/ecosystem/jobs/${jobId}/apply`, payload),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['job', v.jobId] })
      qc.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
}

export const useJobApplications = (jobId: number | null) => {
  const token = localStorage.getItem('token')
  return useQuery<JobApplication[]>({
    queryKey: ['job-applications', jobId],
    queryFn: async () => {
      const { data } = await batiAPI.get(`/api/ecosystem/jobs/${jobId}/applications`)
      return (data.data ?? data) as JobApplication[]
    },
    enabled: !!jobId && !!token,
  })
}
