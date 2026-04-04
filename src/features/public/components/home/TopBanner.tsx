// TopBanner.tsx — Bandeau global en haut de toutes les pages
// Fidèle à ~/project/AbracadaBati/frontend/src/components/ui/TopBanner.jsx
// CSS inline exact copié depuis Emergent

export default function TopBanner() {
  return (
    <>
      {/* ═══ DESKTOP (≥ 1024px) — FIXED, toujours visible ═══ */}
      <div
        className="top-banner hidden lg:flex"
        style={{
          background: 'linear-gradient(90deg, #EA580C 0%, #F97316 50%, #EA580C 100%)',
          height: '40px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
          width: '100%',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: '0.01em',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              background: '#FFFFFF',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(255,255,255,0.6)',
              animation: 'pulse 2s infinite',
            }}
          />
          Site en démonstration – Réservé aux pros – Ouverture au public le 1er Juillet 2026
        </span>
      </div>

      {/* Spacer desktop pour compenser le bandeau fixed (40px) */}
      <div className="hidden lg:block" style={{ height: '40px' }} />

      {/* ═══ TABLETTE (768px - 1023px) — FIXED, toujours visible ═══ */}
      <div
        className="top-banner hidden md:flex lg:hidden"
        style={{
          background: 'linear-gradient(90deg, #EA580C 0%, #F97316 50%, #EA580C 100%)',
          height: '36px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
          width: '100%',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: '600',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: '0.01em',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              background: '#FFFFFF',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(255,255,255,0.6)',
              animation: 'pulse 2s infinite',
            }}
          />
          Site en démonstration – Ouverture au public le 1er Juillet 2026
        </span>
      </div>

      {/* Spacer tablette pour compenser le bandeau fixed (36px) */}
      <div className="hidden md:block lg:hidden" style={{ height: '36px' }} />

      {/* ═══ MOBILE (< 768px) — STICKY en haut ═══ */}
      <div
        className="top-banner flex md:hidden"
        style={{
          background: 'linear-gradient(90deg, #EA580C 0%, #F97316 100%)',
          height: '36px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
          position: 'sticky',
          top: 0,
          zIndex: 1001,
          width: '100%',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFFFFF',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {/* Indicateur lumineux */}
          <span
            style={{
              width: '6px',
              height: '6px',
              background: '#FFFFFF',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(255,255,255,0.6)',
              flexShrink: 0,
            }}
          />
          {/* Texte principal */}
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.02em',
            }}
          >
            Bêta
          </span>
          {/* Séparateur */}
          <span
            style={{
              width: '1px',
              height: '12px',
              background: 'rgba(255,255,255,0.4)',
            }}
          />
          {/* Date d'ouverture */}
          <span
            style={{
              fontSize: '12px',
              fontWeight: '500',
              opacity: 0.95,
            }}
          >
            Ouverture 1er Juillet 2026
          </span>
        </span>
      </div>
    </>
  )
}

export const TOP_BANNER_HEIGHT = {
  desktop: 40,
  mobile: 36,
}
