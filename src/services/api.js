const API_BASE =
  import.meta.env.VITE_API_BASE || 'https://catalyst-career-ai-backend.onrender.com/api'
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || ''
const ADMIN_JWT = () => localStorage.getItem('admin_jwt') || ''

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': ADMIN_TOKEN,
      ...(ADMIN_JWT() ? { 'Authorization': `Bearer ${ADMIN_JWT()}` } : {}),
    },
    credentials: 'include',
  })
  if (!res.ok) {
    let msg = 'Request failed'
    try { msg = await res.text() } catch {}
    throw new Error(msg)
  }
  return res.json()
}

export async function getUsers() {
  return apiGet('/admin/users')
}

export async function getUserSummary(userId) {
  return apiGet(`/admin/users/${userId}/summary`)
}

export function getApiBaseLabel() {
  return API_BASE
}

export async function adminLogin(email, password) {
  // Use the public auth/login endpoint to get JWT
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) {
    let msg = 'Login failed'
    try { msg = (await res.json()).detail || msg } catch {}
    throw new Error(msg)
  }
  const data = await res.json()
  localStorage.setItem('admin_jwt', data.token)
  localStorage.setItem('admin_user', JSON.stringify(data.user))
  return data
}

export function adminLogout() {
  localStorage.removeItem('admin_jwt')
  localStorage.removeItem('admin_user')
}

export function getAdminUser() {
  const raw = localStorage.getItem('admin_user')
  try { return raw ? JSON.parse(raw) : null } catch { return null }
}

