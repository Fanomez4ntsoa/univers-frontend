import { useMutation } from '@tanstack/react-query'
import { coreAPI } from '../../../shared/lib/axios'
import { clearAuthStorage } from '../../../shared/lib/auth-storage'
import type { User, Profile, LoginResponse } from '../types/auth'

interface LoginPayload {
  email: string
  password: string
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
      const { data } = await coreAPI.post('/api/auth/login', payload, {
        headers: { Accept: 'application/json' },
      })
      return data
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('profile', JSON.stringify(data.profile))
    },
  })
}

export const getStoredUser = (): User | null => {
  const raw = localStorage.getItem('user')
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export const getStoredProfile = (): Profile | null => {
  const raw = localStorage.getItem('profile')
  if (!raw) return null
  try {
    return JSON.parse(raw) as Profile
  } catch {
    return null
  }
}

export const getStoredToken = (): string | null => {
  return localStorage.getItem('token')
}

export const isAuthenticated = (): boolean => {
  return !!getStoredToken()
}

export const logout = () => {
  clearAuthStorage()
  window.location.href = '/login'
}
