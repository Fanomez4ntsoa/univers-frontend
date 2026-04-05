// PublicationZone.tsx — Fidèle à Emergent zone publication desktop

import { useNavigate } from 'react-router-dom'

export default function PublicationZone() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#E8650A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '18px' }}>
          T
        </div>
        <button
          onClick={() => navigate('/feed')}
          style={{ flex: 1, padding: '12px 16px', background: '#F3F4F6', border: 'none', borderRadius: '24px', textAlign: 'left', color: '#9CA3AF', fontSize: '14px', cursor: 'pointer' }}
        >
          Partage ton chantier, ton conseil, ta réalisation...
        </button>
      </div>
    </div>
  )
}
