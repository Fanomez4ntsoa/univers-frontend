// ReseauSidebarLeft.tsx — Fidèle à Emergent sidebar gauche "Explorer le Réseau"
// 280px sticky, catégories avec emojis, actif orange #FFF3EC/#E8650A

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RESEAU_CATEGORIES = [
  { id: 'feed', label: 'Fil d\'actualité', icon: '📰' },
  { id: 'chantiers', label: 'Chantiers', icon: '🏗️' },
  { id: 'produits', label: 'Produits', icon: '🛒' },
  { id: 'tutos', label: 'Tutos & Conseils', icon: '💡' },
  { id: 'metiers', label: 'Par métier', icon: '👷' },
  { id: 'proximite', label: 'Près de chez moi', icon: '📍' },
  { id: 'divider1', type: 'divider' as const },
  { id: 'cinema', label: 'Cinéma', icon: '🎬', path: '/feed' },
  { id: 'salons', label: 'Salons', icon: '🎪' },
  { id: 'evenements', label: 'Événements', icon: '📅' },
  { id: 'divider2', type: 'divider' as const },
  { id: 'groupes', label: 'Groupes', icon: '👥' },
  { id: 'pages', label: 'Pages pros', icon: '📄' },
]

export default function ReseauSidebarLeft() {
  const [activeCategory, setActiveCategory] = useState('feed')
  const navigate = useNavigate()

  return (
    <div style={{ width: '280px', flexShrink: 0 }}>
      <div style={{ position: 'sticky', top: '160px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a2a4a', marginBottom: '16px', paddingLeft: '8px' }}>
            Explorer le Réseau
          </h3>
          {RESEAU_CATEGORIES.map((cat) =>
            cat.type === 'divider' ? (
              <div key={cat.id} style={{ height: '1px', background: '#E5E7EB', margin: '12px 0' }} />
            ) : (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.path) navigate(cat.path)
                  else setActiveCategory(cat.id)
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  background: activeCategory === cat.id ? '#FFF3EC' : 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  color: activeCategory === cat.id ? '#E8650A' : '#374151',
                  fontSize: '14px',
                  fontWeight: activeCategory === cat.id ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '18px' }}>{cat.icon}</span>
                {cat.label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
