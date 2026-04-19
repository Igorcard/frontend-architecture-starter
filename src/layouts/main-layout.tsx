import { Link, useRouterState } from '@tanstack/react-router'
import { APP_NAME } from '@core/constants'
import { useAuth } from '@core/hooks'
import { useAppStore } from '@core/app-store'
import { Button } from '@ui/button'
import type { ReactNode } from 'react'

export function MainLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed)
  const setSidebarCollapsed = useAppStore((s) => s.setSidebarCollapsed)

  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <aside
        className={`border-b border-zinc-200 bg-white md:border-b-0 md:border-r ${sidebarCollapsed ? 'md:w-16' : 'md:w-56'}`}
      >
        <div className="flex h-14 items-center justify-between border-b border-zinc-100 px-4">
          {!sidebarCollapsed ? (
            <span className="text-sm font-semibold text-zinc-900">{APP_NAME}</span>
          ) : (
            <span className="sr-only">{APP_NAME}</span>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? '»' : '«'}
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-2">
          <NavLink to="/dashboard" current={pathname === '/dashboard'}>
            Dashboard
          </NavLink>
          <NavLink
            to="/items"
            search={{ q: undefined }}
            current={pathname.startsWith('/items')}
          >
            Items
          </NavLink>
          <NavLink to="/settings" current={pathname === '/settings'}>
            Settings
          </NavLink>
        </nav>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-end border-b border-zinc-200 bg-white px-4">
          <Button type="button" variant="secondary" size="sm" onClick={() => void logout()}>
            Sign out
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

function NavLink({
  to,
  search,
  current,
  children,
}: {
  to: string
  search?: Record<string, string | undefined>
  current: boolean
  children: ReactNode
}) {
  return (
    <Link
      to={to}
      search={search}
      className={`rounded-md px-3 py-2 text-sm font-medium ${
        current ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50'
      }`}
    >
      {children}
    </Link>
  )
}
