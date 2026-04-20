import { APP_NAME } from '@core/constants'
import type { ReactNode } from 'react'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,24rem)]">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 px-10 py-12 text-white md:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-200/90">
            Demo ao vivo
          </div>
          <h1 className="font-display max-w-md text-3xl font-semibold leading-tight tracking-tight lg:text-4xl">
            Um app que parece pronto para uso.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            Autenticação mock, grade de dados, formulários e rotas aninhadas — tudo navegável para
            explorar a arquitetura sem configurar backend.
          </p>
        </div>
        <div className="relative text-xs text-slate-500">
          <p className="font-medium text-slate-400">{APP_NAME}</p>
          <p className="mt-1">React · TanStack Router · Query · MSW</p>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-slate-50/80 px-4 py-10 sm:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 md:hidden">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              {APP_NAME}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
