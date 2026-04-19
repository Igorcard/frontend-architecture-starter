import { cx } from '@ui/variants'
import type { ComponentProps } from 'react'

export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cx('animate-pulse rounded-md bg-zinc-200', className)}
      data-slot="skeleton"
      {...props}
    />
  )
}
