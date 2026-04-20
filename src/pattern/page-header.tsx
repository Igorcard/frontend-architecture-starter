import type { ReactNode } from 'react'
import { cx } from '@ui/variants'

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
  children,
}: {
  title: string
  description?: string
  eyebrow?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700/90">{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">{description}</p>
        ) : null}
      </div>
      {children ? <div className="flex shrink-0 flex-wrap gap-2">{children}</div> : null}
    </div>
  )
}
