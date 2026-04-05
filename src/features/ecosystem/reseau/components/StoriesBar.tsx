// StoriesBar.tsx — Fidèle à Emergent StoriesBar / Stories Desktop
// Scroll horizontal d'avatars avec bordure orange + bouton Publier dashed

import { Plus } from 'lucide-react'

const DEMO_STORIES = [
  { id: 'story-1', author_name: 'Pierre Dupont', author_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', viewed: false },
  { id: 'story-2', author_name: 'Marie Lefebvre', author_photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', viewed: false },
  { id: 'story-3', author_name: 'Thomas Martin', author_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', viewed: true },
  { id: 'story-4', author_name: 'Jean Moreau', author_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', viewed: true },
  { id: 'story-5', author_name: 'Sophie Bernard', author_photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', viewed: true },
]

export default function StoriesBar({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const stories = DEMO_STORIES

  if (variant === 'desktop') {
    return (
      <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a2a4a' }}>Stories</h3>
          <button style={{ background: 'transparent', border: 'none', color: '#E8650A', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Voir tout</button>
        </div>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {/* Bouton Publier */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px dashed #E8650A', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF3EC' }}>
              <Plus size={24} color="#E8650A" />
            </div>
            <span style={{ fontSize: '11px', color: '#555' }}>Publier</span>
          </div>
          {stories.map((story) => (
            <div key={story.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: `2.5px solid ${story.viewed ? '#D1D5DB' : '#E8650A'}`, padding: '2px' }}>
                <img src={story.author_photo} alt={story.author_name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '11px', color: '#555', maxWidth: '64px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {story.author_name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Mobile version
  return (
    <div style={{ background: '#fff', padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', flexShrink: 0 }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px dashed #E8650A', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF3EC' }}>
            <Plus size={20} color="#E8650A" />
          </div>
          <span style={{ fontSize: '10px', color: '#555' }}>Publier</span>
        </div>
        {stories.map((story) => (
          <div key={story.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: `2.5px solid ${story.viewed ? '#D1D5DB' : '#E8650A'}`, padding: '2px' }}>
              <img src={story.author_photo} alt={story.author_name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontSize: '10px', color: '#555', maxWidth: '56px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {story.author_name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
