import { cx } from '@ui/variants'
import type { ComponentProps } from 'react'

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cx(
        'min-h-24 w-full rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-teal-600/0 transition-[border-color,box-shadow] placeholder:text-slate-400 focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      data-slot="textarea"
      {...props}
    />
  )
}
