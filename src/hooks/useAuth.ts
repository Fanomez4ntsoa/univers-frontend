import { useMutation } from '@tanstack/react-query'
import { coreAPI } from '../lib/axios'
import type { User, LoginResponse } from '../types/auth'

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

export const getStoredToken = (): string | null => {
  return localStorage.getItem('token')
}

export const isAuthenticated = (): boolean => {
  return !!getStoredToken()
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}
