import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/ui/dialog'
import { Button } from '../../../shared/ui/button'
import { Input } from '../../../shared/ui/input'
import { toast } from 'sonner'
import { useSignPortalQuote } from '../hooks/usePortal'

interface PortalSignatureModalProps {
  open: boolean
  onClose: () => void
  token: string
  quoteId: number
}

export default function PortalSignatureModal({ open, onClose, token, quoteId }: PortalSignatureModalProps) {
  const [signedBy, setSignedBy] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const signMutation = useSignPortalQuote(token)

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    isDrawingRef.current = true
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#1E293B'
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDraw = () => { isDrawingRef.current = false }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleSubmit = () => {
    if (!signedBy.trim()) { toast.error('Le nom du signataire est obligatoire'); return }
    const canvas = canvasRef.current
    if (!canvas) return
    const signatureImage = canvas.toDataURL('image/png')

    signMutation.mutate(
      { quoteId, signature_image: signatureImage, signed_by: signedBy, signed_at: new Date().toISOString().split('T')[0] },
      { onSuccess: () => { toast.success('Devis signé avec succès'); onClose() }, onError: () => toast.error('Erreur lors de la signature') }
    )
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Signer le devis</DialogTitle></DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ton nom *</label>
            <Input value={signedBy} onChange={(e) => setSignedBy(e.target.value)} placeholder="Jean Dupont" className="h-11 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ta signature</label>
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <canvas ref={canvasRef} width={400} height={200} className="w-full cursor-crosshair" onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw} />
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={clearCanvas} className="mt-1 text-xs">Effacer</Button>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="rounded-lg">Annuler</Button>
            <Button onClick={handleSubmit} disabled={signMutation.isPending} className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              {signMutation.isPending ? 'Signature...' : 'Signer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
