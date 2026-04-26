import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../hooks/useAuth'
import { useMe } from '../hooks/useMe'
import PageSkeleton from '../../../shared/components/PageSkeleton'

export default function AuthGuard() {
  const authed = isAuthenticated()
  const { isPending, data } = useMe()

  if (!authed) {
    return <Navigate to="/login" replace />
  }

  if (isPending && !data) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <PageSkeleton />
      </div>
    )
  }

  return <Outlet />
}
