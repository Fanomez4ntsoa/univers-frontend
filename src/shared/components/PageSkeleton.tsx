export default function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-40 bg-slate-200 rounded-lg" />
          <div className="h-4 w-64 bg-slate-200 rounded-lg mt-2" />
        </div>
        <div className="h-11 w-44 bg-slate-200 rounded-lg" />
      </div>
      <div className="h-11 w-80 bg-slate-200 rounded-xl" />
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
