export default function UsersTable({ users, onSelect }) {
  return (
    <div className="overflow-x-auto border rounded-lg bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Created</th>
            <th className="text-left p-3">Last Login</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.name || '-'}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.created_at ? new Date(u.created_at).toLocaleString() : '-'}</td>
              <td className="p-3">{u.last_login_at ? new Date(u.last_login_at).toLocaleString() : '-'}</td>
              <td className="p-3">
                <button className="text-amber-600 hover:underline" onClick={() => onSelect(u)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

