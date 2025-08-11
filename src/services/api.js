const API_BASE =
  import.meta.env.VITE_API_BASE || 'https://catalyst-career-ai-backend.onrender.com/api'
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || ''

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': ADMIN_TOKEN,
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

