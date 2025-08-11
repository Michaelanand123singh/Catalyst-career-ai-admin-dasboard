import { useEffect, useState } from 'react'
import { apiGet } from '../services/api'

export default function ActivityPage() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        const data = await apiGet('/admin/activity')
        setItems(data.activity || [])
      } catch {
        setError('Failed to load activity')
      }
    }
    run()
  }, [])

  return (
    <div className="space-y-4">
      <div className="text-slate-700 font-medium">Recent Activity</div>
      {error && <div className="text-sm text-rose-600">{error}</div>}
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3">Time</th>
              <th className="text-left p-3">User ID</th>
              <th className="text-left p-3">Message</th>
              <th className="text-left p-3">Agent</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.ts ? new Date(a.ts).toLocaleString() : '-'}</td>
                <td className="p-3">{a.user_id}</td>
                <td className="p-3 max-w-[32rem] truncate" title={a.message}>{a.message}</td>
                <td className="p-3">{a.agent_used}</td>
                <td className="p-3">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

