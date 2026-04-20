import { cva } from '@ui/variants'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold shadow-sm transition-[color,box-shadow,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-teal-700 text-white shadow-teal-900/20 hover:bg-teal-800 hover:shadow-md',
        secondary:
          'border border-slate-200/90 bg-white text-slate-800 shadow-slate-900/5 hover:border-slate-300 hover:bg-slate-50',
        ghost: 'border border-transparent bg-transparent text-slate-700 shadow-none hover:bg-slate-100/80',
        danger: 'bg-red-600 text-white shadow-red-900/15 hover:bg-red-500',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)
