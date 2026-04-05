// ReseauSidebarRight.tsx — Fidèle à Emergent sidebar droite
// Événements + Pros actifs — 320px sticky

const DEMO_EVENTS = [
  { title: 'Salon Batimat 2026', date: '15-18 Avril', lieu: 'Paris Expo' },
  { title: 'Forum Emploi BTP', date: '22 Avril', lieu: 'Lyon' },
  { title: 'Journée Portes Ouvertes', date: '28 Avril', lieu: 'Marseille' },
]

const DEMO_PROS = [
  { id: 'p1', name: 'Pierre Dupont', job: 'Maçon · Lyon', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { id: 'p2', name: 'Marie Lefebvre', job: 'Architecte · Paris', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { id: 'p3', name: 'Thomas Martin', job: 'Plombier · Bordeaux', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
]

export default function ReseauSidebarRight() {
  return (
    <div style={{ width: '320px', flexShrink: 0 }}>
      <div style={{ position: 'sticky', top: '160px' }}>
        {/* Événements */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a2a4a', marginBottom: '16px' }}>
            🎪 Événements à venir
          </h3>
          {DEMO_EVENTS.map((event, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: idx < 2 ? '1px solid #F3F4F6' : 'none' }}>
              <div style={{ width: '48px', height: '48px', background: '#FFF3EC', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#E8650A' }}>{event.date.split(' ')[0]}</span>
                <span style={{ fontSize: '9px', color: '#888' }}>{event.date.split(' ')[1] || 'Avr'}</span>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a2a4a' }}>{event.title}</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>📍 {event.lieu}</div>
              </div>
            </div>
          ))}
          <button style={{ width: '100%', padding: '10px', marginTop: '12px', background: '#FFF3EC', border: '1px solid #E8650A', borderRadius: '8px', color: '#E8650A', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Voir tous les événements
          </button>
        </div>

        {/* Pros actifs */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', marginTop: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a2a4a', marginBottom: '16px' }}>
            👷 Pros actifs
          </h3>
          {DEMO_PROS.map((pro) => (
            <div key={pro.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
              <div style={{ position: 'relative' }}>
                <img src={pro.photo} alt={pro.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', background: '#22C55E', borderRadius: '50%', border: '2px solid #fff' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a2a4a' }}>{pro.name}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{pro.job}</div>
              </div>
              <button style={{ padding: '6px 12px', background: '#FFF3EC', border: '1px solid #E8650A', borderRadius: '8px', color: '#E8650A', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                Suivre
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
