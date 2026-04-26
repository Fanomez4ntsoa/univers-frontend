import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'

export default function VerificationBanner() {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <div
        className="flex items-center gap-2 p-2.5 rounded-lg"
        style={{
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
        }}
      >
        <CheckCircle size={16} style={{ color: '#15803D', flexShrink: 0 }} />
        <p style={{ fontSize: '13px', color: '#15803D', fontWeight: '500', margin: 0 }}>
          Une personne = Un compte vérifié ·{' '}
          <button
            type="button"
            onClick={() => setShowPopup(true)}
            style={{
              textDecoration: 'underline',
              color: '#15803D',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            En savoir plus
          </button>
        </p>
      </div>

      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Publie en toute sécurité</h3>
            </div>

            <p className="text-gray-600 mb-4">
              Chez AbracadaBati, nous garantissons un environnement de confiance grâce à notre processus de vérification d'identité.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Pièce d'identité</p>
                  <p className="text-sm text-gray-500">Carte d'identité ou passeport valide</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Selfie de vérification</p>
                  <p className="text-sm text-gray-500">Pour confirmer que tu es bien le titulaire</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Tes données sont protégées et ne sont jamais partagées. Processus conforme RGPD.
            </p>

            <Button
              onClick={() => setShowPopup(false)}
              className="w-full h-11 bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              J'ai compris
            </Button>
          </motion.div>
        </div>
      )}
    </>
  )
}
