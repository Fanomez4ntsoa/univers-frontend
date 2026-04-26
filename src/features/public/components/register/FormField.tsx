import type { InputHTMLAttributes, ReactNode } from 'react'
import { Input } from '../../../../shared/ui/input'

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label: string
  icon?: ReactNode
  prefix?: ReactNode
  error?: string
}

export default function FormField({ label, icon, prefix, error, className = '', ...props }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {prefix}
          </span>
        )}
        <Input
          {...props}
          className={`${icon ? 'pl-10' : prefix ? 'pl-8' : ''} ${error ? 'border-red-500' : ''} ${className}`.trim()}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
