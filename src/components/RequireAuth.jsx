import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getAdminUser } from '../services/api'

export default function RequireAuth() {
  const location = useLocation()
  const user = getAdminUser()
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?next=${next}`} replace />
  }
  return <Outlet />
}


