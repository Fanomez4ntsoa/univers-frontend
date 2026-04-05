// BetaBannerReseau.tsx — Fidèle à Emergent bandeau Beta spécifique réseau
// Fond #FFF7ED, border-left #EA580C — texte spécifique réseau

export default function BetaBannerReseau() {
  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '8px 24px',
    }}>
      <div style={{
        background: '#FFF7ED',
        border: '1px solid #FDBA74',
        borderLeft: '4px solid #EA580C',
        borderRadius: '12px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '2px solid #EA580C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '1px',
        }}>
          <span style={{ color: '#EA580C', fontSize: '12px', fontWeight: 700 }}>!</span>
        </div>
        <p style={{
          color: '#9A3412',
          fontSize: '13px',
          lineHeight: 1.5,
          margin: 0,
        }}>
          Tu explores la <span style={{ fontWeight: 700, color: '#1E40AF' }}>version Bêta</span> du Réseau AbracadaBati — les publications, profils et stories affichés sont fictifs. Ouverture officielle le <span style={{ fontWeight: 700, color: '#EA580C' }}>1er Juillet 2026</span>.
        </p>
      </div>
    </div>
  )
}
