import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosError } from 'axios'
import { clearAuthStorage } from './auth-storage'

export const coreAPI = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_URL,
})

export const batiAPI = axios.create({
  baseURL: import.meta.env.VITE_BATI_API_URL,
})

export const portalAPI = axios.create({
  baseURL: import.meta.env.VITE_BATI_API_URL,
})

export const ecosystemAPI = axios.create({
  baseURL: import.meta.env.VITE_BATI_API_URL,
})

const attachBearer = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}

const handle401 = (error: AxiosError) => {
  if (error.response?.status === 401 && localStorage.getItem('token')) {
    clearAuthStorage()
    window.location.href = '/login'
  }
  return Promise.reject(error)
}

coreAPI.interceptors.request.use(attachBearer)
coreAPI.interceptors.response.use((response) => response, handle401)

batiAPI.interceptors.request.use(attachBearer)
batiAPI.interceptors.response.use((response) => response, handle401)

ecosystemAPI.interceptors.request.use(attachBearer)
