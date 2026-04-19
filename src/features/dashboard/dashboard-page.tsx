import { Link } from '@tanstack/react-router'

export function DashboardPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
      <p className="text-sm text-zinc-600">
        Example shell route. Go to{' '}
        <Link
          to="/items"
          search={{ q: undefined }}
          className="font-medium text-zinc-900 underline"
        >
          Items
        </Link>{' '}
        for the data grid demo.
      </p>
    </div>
  )
}
