import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { batiAPI } from '../../../../shared/lib/axios'
import type { CompanySettings } from '../../../../shared/types/crm'

const QUERY_KEY = ['company-settings']

export const useSettings = () => {
  return useQuery<CompanySettings>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/batiment/settings/company')
      return data
    },
  })
}

export const useUpdateSettings = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<CompanySettings>) =>
      batiAPI.put('/api/batiment/settings/company', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
