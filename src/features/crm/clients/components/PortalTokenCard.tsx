import { Copy, RefreshCw, ExternalLink } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import { useGeneratePortalToken } from '../hooks/useClients'

interface PortalTokenCardProps {
  clientId: number
  token: string | null
}

export default function PortalTokenCard({ clientId, token }: PortalTokenCardProps) {
  const generateMutation = useGeneratePortalToken()

  const handleCopy = () => {
    if (!token) return
    navigator.clipboard.writeText(token)
    toast.success('Token copié')
  }

  const handleGenerate = () => {
    generateMutation.mutate(clientId, {
      onSuccess: () => toast.success('Token généré'),
      onError: () => toast.error('Erreur lors de la génération'),
    })
  }

  return (
    <div className="bg-gradient-to-r from-[#1E40AF]/10 to-[#F97316]/10 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-slate-700 mb-2">Portail client</h4>
      {token ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
            <code className="text-xs text-slate-600 flex-1 truncate">{token}</code>
            <Button variant="ghost" size="icon-sm" onClick={handleCopy} title="Copier">
              <Copy className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={handleGenerate} disabled={generateMutation.isPending} title="Régénérer">
              <RefreshCw className={`w-3.5 h-3.5 ${generateMutation.isPending ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> Portail actif
          </p>
        </div>
      ) : (
        <Button
          onClick={handleGenerate}
          disabled={generateMutation.isPending}
          variant="outline"
          className="w-full rounded-lg"
        >
          {generateMutation.isPending ? 'Génération...' : 'Générer un lien portail'}
        </Button>
      )}
    </div>
  )
}
