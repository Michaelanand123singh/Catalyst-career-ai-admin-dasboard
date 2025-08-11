export default function Stat({ label, value }) {
  return (
    <div className="p-4 rounded-lg border bg-white">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-xl font-semibold text-slate-800">{value}</div>
    </div>
  )
}

