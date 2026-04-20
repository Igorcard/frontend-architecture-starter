import { Link, useRouterState } from '@tanstack/react-router'
import { APP_NAME } from '@core/constants'
import { useAuth } from '@core/hooks'
import { useAppStore } from '@core/app-store'
import { Button } from '@ui/button'
import { cx } from '@ui/variants'
import type { ReactNode } from 'react'

export function MainLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed)
  const setSidebarCollapsed = useAppStore((s) => s.setSidebarCollapsed)

  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <aside
        className={cx(
          'flex shrink-0 flex-col border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-300 md:min-h-dvh',
          sidebarCollapsed ? 'md:w-[4.25rem]' : 'md:w-60',
        )}
      >
        <div className="flex h-14 items-center justify-between gap-2 border-b border-slate-800/80 px-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-700 text-sm font-bold text-white shadow-lg shadow-teal-900/40"
              aria-hidden
            >
              W
            </span>
            {!sidebarCollapsed ? (
              <div className="min-w-0 leading-tight">
                <span className="block truncate text-sm font-semibold tracking-tight text-white">
                  {APP_NAME}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-teal-300/90">
                  Demo
                </span>
              </div>
            ) : (
              <span className="sr-only">{APP_NAME}</span>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0 border-slate-700/80 text-slate-400 hover:bg-slate-800 hover:text-white"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {sidebarCollapsed ? '»' : '«'}
          </Button>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Principal">
          <NavLink
            to="/dashboard"
            icon={<IconLayout />}
            current={pathname === '/dashboard'}
            collapsed={sidebarCollapsed}
          >
            Painel
          </NavLink>
          <NavLink
            to="/items"
            search={{ q: undefined }}
            icon={<IconItems />}
            current={pathname.startsWith('/items')}
            collapsed={sidebarCollapsed}
          >
            Itens
          </NavLink>
          <NavLink
            to="/settings"
            icon={<IconSettings />}
            current={pathname === '/settings'}
            collapsed={sidebarCollapsed}
          >
            Ajustes
          </NavLink>
        </nav>
        <div className="border-t border-slate-800/80 p-2">
          <p
            className={cx(
              'mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-slate-500',
              sidebarCollapsed && 'sr-only',
            )}
          >
            Conta
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 border border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-800/80 hover:text-white"
            onClick={() => void logout()}
          >
            <IconLogout className="size-4 shrink-0 opacity-80" />
            {!sidebarCollapsed ? <span>Sair</span> : <span className="sr-only">Sair</span>}
          </Button>
        </div>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/40 px-4 backdrop-blur-md md:hidden">
          <span className="text-sm font-semibold text-slate-800">{APP_NAME}</span>
          <Button type="button" variant="secondary" size="sm" onClick={() => void logout()}>
            Sair
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}

function NavLink({
  to,
  search,
  current,
  children,
  icon,
  collapsed,
}: {
  to: string
  search?: Record<string, string | undefined>
  current: boolean
  children: ReactNode
  icon: ReactNode
  collapsed: boolean
}) {
  return (
    <Link
      to={to}
      {...(search !== undefined ? { search } : {})}
      className={cx(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-[background,color,box-shadow]',
        current
          ? 'bg-teal-500/15 text-white shadow-inner shadow-teal-950/20 ring-1 ring-teal-400/25'
          : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100',
      )}
    >
      <span
        className={cx(
          'flex size-9 shrink-0 items-center justify-center rounded-lg',
          current ? 'bg-teal-500/20 text-teal-200' : 'bg-slate-800/50 text-slate-500',
        )}
        aria-hidden
      >
        {icon}
      </span>
      {collapsed ? <span className="sr-only">{children}</span> : <span>{children}</span>}
    </Link>
  )
}

function IconLayout() {
  return (
    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
    </svg>
  )
}

function IconItems() {
  return (
    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

function IconSettings() {
  return (
    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function IconLogout(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )
}
