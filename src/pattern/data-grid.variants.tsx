import { cva } from '@ui/variants'

export const dataGridToolbarVariants = cva(
  'flex flex-col gap-3 border-b border-zinc-200 bg-zinc-50/80 px-3 py-2 sm:flex-row sm:items-center sm:justify-between',
)

export const dataGridFooterVariants = cva(
  'flex items-center justify-between border-t border-zinc-200 px-3 py-2 text-sm text-zinc-600',
)
