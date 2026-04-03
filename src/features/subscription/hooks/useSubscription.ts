import { useQuery, useMutation } from '@tanstack/react-query'
import { batiAPI } from '../../../shared/lib/axios'
import type { Subscription, CheckoutSession, PortalSession } from '../types/subscription'

export const useSubscriptionStatus = () => {
  return useQuery<Subscription | null>({
    queryKey: ['subscription-status'],
    queryFn: async () => {
      const { data } = await batiAPI.get('/api/subscription/status')
      return data
    },
  })
}

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: async (plan: string): Promise<CheckoutSession> => {
      const { data } = await batiAPI.post('/api/subscription/checkout', { plan })
      return data
    },
    onSuccess: (data) => {
      window.location.href = data.checkout_url
    },
  })
}

export const useCancelSubscription = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await batiAPI.post('/api/subscription/cancel')
      return data
    },
  })
}

export const useCustomerPortal = () => {
  return useMutation({
    mutationFn: async (): Promise<PortalSession> => {
      const { data } = await batiAPI.get('/api/subscription/portal')
      return data
    },
    onSuccess: (data) => {
      window.location.href = data.portal_url
    },
  })
}
