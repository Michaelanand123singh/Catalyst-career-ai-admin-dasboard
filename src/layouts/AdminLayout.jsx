import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { getApiBaseLabel, getAdminUser, adminLogout } from '../services/api'

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = getAdminUser()

  if (!user) {
    const redirectTo = `/login?next=${encodeURIComponent(location.pathname + location.search)}`
    navigate(redirectTo, { replace: true })
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-slate-800 font-semibold">Admin Dashboard</div>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-slate-600 hover:text-slate-900">Users</Link>
            <Link to="/activity" className="text-slate-600 hover:text-slate-900">Activity</Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-500">API: {getApiBaseLabel()}</div>
            <div className="text-xs text-slate-700">{user?.email}</div>
            <button
              onClick={() => { adminLogout(); navigate('/login') }}
              className="text-xs px-2 py-1 border rounded hover:bg-slate-100"
            >Logout</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

