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

const isJwtExpired = (token: string): boolean => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const payload = JSON.parse(atob(padded)) as { exp?: number }
    if (typeof payload.exp !== 'number') return false
    return payload.exp * 1000 < Date.now()
  } catch {
    return false
  }
}

export const isAuthenticated = (): boolean => {
  const token = getStoredToken()
  if (!token) return false
  if (isJwtExpired(token)) {
    clearAuthStorage()
    return false
  }
  return true
}

export const logout = () => {
  clearAuthStorage()
  window.location.href = '/login'
}
