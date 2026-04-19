import { cva } from '@ui/variants'

export const inputVariants = cva(
  'flex h-10 w-full min-w-0 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus-visible:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10',
        lg: 'h-11',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)
