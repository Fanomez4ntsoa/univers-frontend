import { Menu, LogOut } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { getStoredUser, logout } from '../../../auth/hooks/useAuth'

interface TopBarProps {
  onMenuClick: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const user = getStoredUser()

  return (
    <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-slate-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <Menu className="w-5 h-5 text-slate-600" />
      </button>

      <div className="flex items-center gap-3 ml-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg">
          <div className="w-8 h-8 bg-[#1E40AF]/10 rounded-full flex items-center justify-center">
            <span className="text-[#1E40AF] font-semibold text-sm">
              {user?.display_name?.charAt(0).toUpperCase() ?? '?'}
            </span>
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-[150px] truncate">
            {user?.display_name ?? user?.username ?? 'Utilisateur'}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          className="text-slate-500 hover:text-red-500 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
