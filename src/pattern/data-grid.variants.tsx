import { cva } from '@ui/variants'

export const dataGridToolbarVariants = cva(
  'flex flex-col gap-3 border-b border-slate-200/80 bg-gradient-to-r from-white via-slate-50/90 to-teal-50/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
)

export const dataGridFooterVariants = cva(
  'flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-600',
)
