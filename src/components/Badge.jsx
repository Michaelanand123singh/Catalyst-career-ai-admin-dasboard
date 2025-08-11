const colorClassMap = {
  slate: 'bg-slate-100 text-slate-700',
  amber: 'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  rose: 'bg-rose-100 text-rose-700',
}

export default function Badge({ children, color = 'slate' }) {
  const colorClasses = colorClassMap[color] || colorClassMap.slate
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${colorClasses}`}>
      {children}
    </span>
  )
}

