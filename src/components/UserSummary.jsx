import Stat from './Stat'

export default function UserSummary({ user, summary }) {
  if (!user) return null
  return (
    <div className="space-y-3">
      <div className="text-slate-800 font-semibold">{user.name || user.email}</div>
      {summary?.summary && (
        <div className="text-sm text-slate-700 bg-slate-50 border rounded p-3">{summary.summary}</div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Stat label="Resume" value={summary?.topics?.resume ?? 0} />
        <Stat label="Interview" value={summary?.topics?.interview ?? 0} />
        <Stat label="Salary" value={summary?.topics?.salary ?? 0} />
        <Stat label="Skills" value={summary?.topics?.skills ?? 0} />
        <Stat label="Network" value={summary?.topics?.network ?? 0} />
        <Stat label="Transition" value={summary?.topics?.transition ?? 0} />
      </div>
      <div>
        <div className="text-xs text-slate-500 mb-1">Recent queries</div>
        <div className="flex flex-wrap gap-2">
          {(summary?.recent_queries || []).map((q, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">{q}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

