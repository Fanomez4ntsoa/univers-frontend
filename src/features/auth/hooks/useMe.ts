import { useQuery } from '@tanstack/react-query'
import { coreAPI } from '../../../shared/lib/axios'
import { isAuthenticated } from './useAuth'
import type { User, Profile } from '../types/auth'

export type MeResponse = User & Profile

export const meQueryKey = ['me'] as const

export const useMe = () => {
  return useQuery({
    queryKey: meQueryKey,
    queryFn: async (): Promise<MeResponse> => {
      const { data } = await coreAPI.get<MeResponse>('/api/me')
      localStorage.setItem('user', JSON.stringify(data))
      localStorage.setItem('profile', JSON.stringify(data))
      return data
    },
    enabled: isAuthenticated(),
    staleTime: 5 * 60_000,
  })
}
