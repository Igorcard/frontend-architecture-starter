import { cx } from '@ui/variants'

export function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        'size-6 animate-spin rounded-full border-2 border-teal-200 border-t-teal-700',
        className,
      )}
      data-slot="loading"
      role="status"
      aria-label="Loading"
    />
  )
}
