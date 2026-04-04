// BetaBanner.tsx — Fidèle à Emergent BetaBanner.jsx
// Bandeau orange #FFF5EC + border-left #F97316

import { AlertCircle } from 'lucide-react'

export default function BetaBanner() {
  return (
    <div
      className="flex items-start gap-3 mb-4"
      style={{
        backgroundColor: '#FFF5EC',
        border: '1px solid #F97316',
        borderLeftWidth: '4px',
        borderLeftColor: '#F97316',
        borderRadius: '0 8px 8px 0',
        padding: '14px 18px',
        gap: '12px',
      }}
    >
      <AlertCircle
        size={16}
        className="hidden sm:block"
        style={{
          color: '#F97316',
          flexShrink: 0,
          marginTop: '2px',
        }}
      />
      <p
        className="text-[12px] sm:text-[13px]"
        style={{
          fontFamily: 'DM Sans, sans-serif',
          lineHeight: '1.6',
          color: '#6B5344',
          margin: 0,
        }}
      >
        Tu explores la <span style={{ fontWeight: 600, color: '#1E3A5F' }}>version Bêta</span> d'Abracadabati — les contenus affichés sont fictifs, uniquement là pour la démo. Ils ne constituent pas des offres réelles. La vraie aventure commence le <span style={{ fontWeight: 600, color: '#E8650A' }}>1er Juillet 2026</span>.
      </p>
    </div>
  )
}
