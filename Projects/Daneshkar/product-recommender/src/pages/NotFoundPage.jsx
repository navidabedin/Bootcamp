import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">
      <p className="text-5xl font-black text-slate-200">404</p>
      <h1 className="mt-4 text-xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-500">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
      >
        Back to catalog
      </Link>
    </div>
  )
}
