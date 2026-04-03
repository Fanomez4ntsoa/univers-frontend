export interface Job {
  id: number
  user_id: number
  title: string
  description: string
  company_name: string
  city: string | null
  contract_type: ContractType
  experience_level: ExperienceLevel
  salary_min: string | null
  salary_max: string | null
  is_remote: boolean
  metier: string | null
  expires_at: string | null
  applications_count: number
  views_count: number
  has_applied: boolean
  created_at: string
}

export interface JobApplication {
  id: number
  job_id: number
  user_id: number
  message: string
  email: string
  phone: string | null
  user: { display_name: string; username: string; avatar_url: string | null }
  created_at: string
}

export interface Event {
  id: number
  user_id: number
  title: string
  description: string
  event_type: EventType
  city: string | null
  address: string | null
  start_date: string
  end_date: string | null
  price: string
  is_online: boolean
  max_attendees: number | null
  attendees_count: number
  is_attending: boolean
  created_at: string
}

export interface EventAttendee {
  id: number
  user: { display_name: string; username: string; avatar_url: string | null }
}

export type ContractType = 'cdi' | 'cdd' | 'interim' | 'apprentissage' | 'stage' | 'freelance'
export type ExperienceLevel = 'debutant' | '1-3' | '3-5' | '5+'
export type EventType = 'salon' | 'formation' | 'networking' | 'conference' | 'portes_ouvertes' | 'autre'

export const CONTRACT_TYPE_CONFIG: Record<ContractType, { label: string; color: string }> = {
  cdi: { label: 'CDI', color: 'bg-green-100 text-green-700' },
  cdd: { label: 'CDD', color: 'bg-blue-100 text-blue-700' },
  interim: { label: 'Intérim', color: 'bg-orange-100 text-[#F97316]' },
  apprentissage: { label: 'Apprentissage', color: 'bg-purple-100 text-purple-700' },
  stage: { label: 'Stage', color: 'bg-pink-100 text-pink-700' },
  freelance: { label: 'Freelance', color: 'bg-cyan-100 text-cyan-700' },
}

export const EXPERIENCE_LEVEL_CONFIG: Record<ExperienceLevel, string> = {
  debutant: 'Débutant accepté',
  '1-3': '1-3 ans',
  '3-5': '3-5 ans',
  '5+': '5+ ans',
}

export const EVENT_TYPE_CONFIG: Record<EventType, { label: string; color: string }> = {
  salon: { label: 'Salon', color: 'bg-blue-100 text-blue-700' },
  formation: { label: 'Formation', color: 'bg-green-100 text-green-700' },
  networking: { label: 'Networking', color: 'bg-purple-100 text-purple-700' },
  conference: { label: 'Conférence', color: 'bg-orange-100 text-[#F97316]' },
  portes_ouvertes: { label: 'Portes ouvertes', color: 'bg-yellow-100 text-yellow-700' },
  autre: { label: 'Autre', color: 'bg-slate-100 text-slate-600' },
}
