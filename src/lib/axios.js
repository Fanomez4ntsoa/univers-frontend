import axios from 'axios'

export const coreAPI = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_URL,
})

export const batiAPI = axios.create({
  baseURL: import.meta.env.VITE_BATI_API_URL,
})

batiAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

batiAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
