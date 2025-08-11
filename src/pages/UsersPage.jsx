import { useEffect, useState } from 'react'
import { getUsers, getUserSummary } from '../services/api'
import UsersTable from '../components/UsersTable'
import UserSummary from '../components/UserSummary'
import Badge from '../components/Badge'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState(null)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        const data = await getUsers()
        setUsers(data.users || [])
      } catch {
        setError('Failed to load users. Configure VITE_API_BASE and VITE_ADMIN_TOKEN.')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const onSelect = async (u) => {
    setSelected(u)
    setSummary(null)
    try {
      const data = await getUserSummary(u.id)
      setSummary(data)
    } catch {
      setSummary({ summary: 'No summary available', topics: {} })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-slate-700 font-medium">Users</div>
          {loading && <Badge color="amber">Loading</Badge>}
        </div>
        {error && <div className="text-sm text-rose-600">{error}</div>}
        <UsersTable users={users} onSelect={onSelect} />
      </section>

      <aside className="lg:col-span-1 space-y-4">
        <div className="p-4 border rounded-lg bg-white">
          <div className="text-slate-700 font-medium mb-2">User Summary</div>
          {!selected && <div className="text-sm text-slate-500">Select a user to view summary.</div>}
          {selected && <UserSummary user={selected} summary={summary} />}
        </div>
      </aside>
    </div>
  )
}

