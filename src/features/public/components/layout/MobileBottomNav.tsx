// MobileBottomNav.tsx — Fidèle à Emergent MobileBottomNav.jsx
// 5 items : Univers / Actu / Publier (FAB) / Cinéma / Cockpit
// Hide on scroll down, show on scroll up

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Globe, Flame, Plus, Film, LayoutGrid } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'univers', label: 'Univers', icon: Globe, path: '/' },
  { id: 'actu', label: 'Actu', icon: Flame, path: '/reseau' },
  { id: 'publier', label: 'Publier', icon: Plus, path: '/annonces', isMain: true },
  { id: 'cinema', label: 'Cinéma', icon: Film, path: '/reseau' },
  { id: 'cockpit', label: 'Cockpit', icon: LayoutGrid, path: '/espace-pro' },
]

export default function MobileBottomNav() {
  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = '/' + (location.pathname.split('/')[1] || '')

  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const currentY = window.scrollY
      setVisible(currentY < lastY || currentY < 10)
      lastY = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="flex items-center justify-around md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9000,
        height: '62px',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: '8px',
        paddingRight: '8px',
        background: '#1E3A5F',
        borderTop: '2px solid #F97316',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = currentPath === item.path
        const Icon = item.icon

        if (item.isMain) {
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: '#F97316',
                border: '3px solid #1E3A5F',
                marginTop: '-16px',
                boxShadow: '0 0 14px rgba(249, 115, 22, 0.65), 0 0 28px rgba(249, 115, 22, 0.25)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              <Icon size={24} style={{ color: '#FFFFFF' }} />
            </button>
          )
        }

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              minWidth: '48px',
            }}
          >
            <Icon
              size={22}
              style={{ color: isActive ? '#F97316' : 'rgba(255,255,255,0.85)' }}
            />
            <span
              style={{
                fontSize: '10px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: isActive ? 700 : 600,
                letterSpacing: '0.01em',
                color: isActive ? '#F97316' : 'rgba(255,255,255,0.85)',
              }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
