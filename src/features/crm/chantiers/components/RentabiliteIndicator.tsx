import { TrendingUp, TrendingDown } from 'lucide-react'
import { RENTABILITY_CONFIG } from '../types/chantier'
import type { RentabilityLevel } from '../types/chantier'

interface RentabiliteIndicatorProps {
  level: RentabilityLevel
  margin?: string | null
}

export default function RentabiliteIndicator({ level, margin }: RentabiliteIndicatorProps) {
  const config = RENTABILITY_CONFIG[level]
  const Icon = level === 'low' ? TrendingDown : TrendingUp

  return (
    <span className={`inline-flex items-center gap-1 text-sm font-medium ${config.color}`}>
      <Icon className="w-4 h-4" />
      {margin ? `${margin}%` : config.label}
    </span>
  )
}
