import { ImageIcon } from 'lucide-react'
import { Input } from '../../../../shared/ui/input'

interface SettingsLogoUploadProps {
  logoUrl: string
  onChange: (url: string) => void
}

export default function SettingsLogoUpload({ logoUrl, onChange }: SettingsLogoUploadProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">Logo</label>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
          ) : (
            <ImageIcon className="w-8 h-8 text-slate-300" />
          )}
        </div>
        <div className="flex-1">
          <Input
            value={logoUrl}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL du logo (ex: https://...)"
            className="h-11 rounded-xl"
          />
          <p className="text-xs text-slate-400 mt-1">Upload fichier disponible prochainement</p>
        </div>
      </div>
    </div>
  )
}
