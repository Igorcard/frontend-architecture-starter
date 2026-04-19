import { cx } from '@ui/variants'
import type { ComponentProps } from 'react'

export function Badge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-700',
        className,
      )}
      data-slot="badge"
      {...props}
    />
  )
}
