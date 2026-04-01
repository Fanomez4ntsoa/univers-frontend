import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Building,
  FileText,
  Receipt,
  HardHat,
  Settings,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  icon: LucideIcon
  label: string
  path: string
}

const navItems: NavItem[] = [
  { icon: Users, label: 'Prospects', path: '/prospects' },
  { icon: Building, label: 'Clients', path: '/clients' },
  { icon: FileText, label: 'Devis', path: '/quotes' },
  { icon: Receipt, label: 'Factures', path: '/invoices' },
  { icon: HardHat, label: 'Chantiers', path: '/chantiers' },
  { icon: Settings, label: 'Paramètres', path: '/settings' },
]

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

function NavLink({ item, isActive, onClick }: { item: NavItem; isActive: boolean; onClick?: () => void }) {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
        isActive
          ? 'bg-[#1E40AF] text-white'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <item.icon className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium">{item.label}</span>
    </Link>
  )
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation()

  const nav = (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      <p className="px-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        CRM
      </p>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          item={item}
          isActive={location.pathname === item.path}
          onClick={mobileOpen ? onMobileClose : undefined}
        />
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 min-h-screen">
        <div className="p-4 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#1E40AF]">AbracadaBati</span>
          </Link>
        </div>
        {nav}
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-[300px] bg-white z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xl font-bold text-[#1E40AF]">AbracadaBati</span>
                <button
                  onClick={onMobileClose}
                  className="p-2 hover:bg-slate-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              {nav}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
