import { User, Building2 } from 'lucide-react'

type UserType = 'particulier' | 'professionnel'

interface UserTypeToggleProps {
  value: UserType
  onChange: (value: UserType) => void
}

export default function UserTypeToggle({ value, onChange }: UserTypeToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onChange('particulier')}
        className={`p-4 rounded-xl border-2 transition-colors ${
          value === 'particulier'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <User
          className={`mx-auto mb-2 ${value === 'particulier' ? 'text-blue-600' : 'text-gray-400'}`}
          size={24}
        />
        <span
          className={`text-sm font-medium ${
            value === 'particulier' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          Particulier
        </span>
      </button>
      <button
        type="button"
        onClick={() => onChange('professionnel')}
        className={`p-4 rounded-xl border-2 transition-colors ${
          value === 'professionnel'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Building2
          className={`mx-auto mb-2 ${value === 'professionnel' ? 'text-blue-600' : 'text-gray-400'}`}
          size={24}
        />
        <span
          className={`text-sm font-medium ${
            value === 'professionnel' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          Professionnel
        </span>
      </button>
    </div>
  )
}
