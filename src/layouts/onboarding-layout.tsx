import type { ReactNode } from 'react'

export function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-zinc-50 p-8">
      <div className="mx-auto max-w-lg">{children}</div>
    </div>
  )
}
