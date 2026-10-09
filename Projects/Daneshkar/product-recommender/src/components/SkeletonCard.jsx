export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-4 h-44 rounded-xl bg-slate-100" />
      <div className="mb-2 h-3 w-20 rounded bg-slate-100" />
      <div className="mb-2 h-3 w-full rounded bg-slate-100" />
      <div className="mb-4 h-3 w-2/3 rounded bg-slate-100" />
      <div className="flex items-center justify-between">
        <div className="h-5 w-16 rounded bg-slate-100" />
        <div className="h-4 w-20 rounded bg-slate-100" />
      </div>
      <div className="mt-3 h-9 w-full rounded-xl bg-slate-100" />
    </div>
  )
}
