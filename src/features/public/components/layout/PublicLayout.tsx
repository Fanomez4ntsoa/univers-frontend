import { Outlet } from 'react-router-dom'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'
import MobileBottomNav from './MobileBottomNav'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <PublicHeader />
      <main className="flex-1 pb-[86px] md:pb-0">
        <Outlet />
      </main>
      <PublicFooter />
      <MobileBottomNav />
    </div>
  )
}
