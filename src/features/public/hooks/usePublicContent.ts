import { useQuery, useMutation } from '@tanstack/react-query'
import { ecosystemAPI, coreAPI } from '../../../shared/lib/axios'

interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  content: string
  rating: number
  avatar_url: string | null
}

interface FaqItem {
  id: number
  question: string
  answer: string
}

interface PublicStats {
  artisans_count: number
  chantiers_count: number
  satisfaction_rate: number
  devis_generated: number
}

export const useTestimonials = () => {
  return useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get('/api/public/testimonials')
      return (data.data ?? data) as Testimonial[]
    },
  })
}

export const useFaq = () => {
  return useQuery<FaqItem[]>({
    queryKey: ['faq'],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get('/api/public/faq')
      return (data.data ?? data) as FaqItem[]
    },
  })
}

export const useStats = () => {
  return useQuery<PublicStats>({
    queryKey: ['public-stats'],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get('/api/public/stats')
      return data
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string; password_confirmation: string; username: string; display_name: string; user_type: string }) => {
      const { data } = await coreAPI.post('/api/auth/register', payload, { headers: { Accept: 'application/json' } })
      return data
    },
  })
}

export const useContactForm = () => {
  return useMutation({
    mutationFn: async (payload: { name: string; email: string; phone?: string; company?: string; message: string }) => {
      const { data } = await ecosystemAPI.post('/api/public/contact', payload)
      return data
    },
  })
}
