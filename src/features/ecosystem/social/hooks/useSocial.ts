import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ecosystemAPI } from '../../../../shared/lib/axios'
import type { UserProfile, DiscoverUser, FollowStats } from '../types/social'

export const useDiscover = () => {
  return useQuery<DiscoverUser[]>({
    queryKey: ['discover'],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get('/api/ecosystem/users')
      return (data.data ?? data) as DiscoverUser[]
    },
  })
}

export const useUserProfile = (id: number | null) => {
  return useQuery<UserProfile>({
    queryKey: ['user-profile', id],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get(`/api/ecosystem/users/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useMyProfile = () => {
  const token = localStorage.getItem('token')
  return useQuery<UserProfile>({
    queryKey: ['my-profile'],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get('/api/ecosystem/profile')
      return data
    },
    enabled: !!token,
  })
}

export const useFollowUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (userId: number) =>
      ecosystemAPI.post(`/api/ecosystem/users/${userId}/follow`),
    onSuccess: (_d, userId) => {
      qc.invalidateQueries({ queryKey: ['user-profile', userId] })
      qc.invalidateQueries({ queryKey: ['discover'] })
    },
  })
}

export const useFollowers = (id: number | null) => {
  return useQuery<FollowStats[]>({
    queryKey: ['followers', id],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get(`/api/ecosystem/users/${id}/followers`)
      return (data.data ?? data) as FollowStats[]
    },
    enabled: !!id,
  })
}

export const useFollowing = (id: number | null) => {
  return useQuery<FollowStats[]>({
    queryKey: ['following', id],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get(`/api/ecosystem/users/${id}/following`)
      return (data.data ?? data) as FollowStats[]
    },
    enabled: !!id,
  })
}
