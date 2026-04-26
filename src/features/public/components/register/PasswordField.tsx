import type { InputHTMLAttributes } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { Input } from '../../../../shared/ui/input'

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  showPassword: boolean
  onToggleShow?: () => void
}

export default function PasswordField({
  label,
  error,
  showPassword,
  onToggleShow,
  className = '',
  ...props
}: PasswordFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          {...props}
          type={showPassword ? 'text' : 'password'}
          className={`pl-10 ${onToggleShow ? 'pr-10' : ''} ${error ? 'border-red-500' : ''} ${className}`.trim()}
        />
        {onToggleShow && (
          <button
            type="button"
            onClick={onToggleShow}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
