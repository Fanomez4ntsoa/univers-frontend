import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  subtitle: string
  link?: string
  linkText?: string
  color?: string
}

export default function SectionHeader({ icon: Icon, title, subtitle, link, linkText, color = '#1E40AF' }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={20} className="sm:w-6 sm:h-6" style={{ color }} />
        </div>
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">{subtitle}</p>}
        </div>
      </div>
      {link && (
        <Link to={link} className="flex items-center gap-1 text-xs sm:text-sm font-semibold hover:underline" style={{ color }}>
          <span className="hidden sm:inline">{linkText || 'Voir tout'}</span>
          <span className="sm:hidden">Tout</span>
          <ArrowRight size={14} className="sm:w-4 sm:h-4" />
        </Link>
      )}
    </div>
  )
}
