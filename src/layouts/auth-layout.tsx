import { APP_NAME } from '@core/constants'
import type { ReactNode } from 'react'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-100 p-6">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          {APP_NAME}
        </p>
      </div>
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        {children}
      </div>
    </div>
  )
}
