import { cx } from '@ui/variants'
import type { ComponentProps } from 'react'

export function Table({ className, ...props }: ComponentProps<'table'>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200/80 bg-white/50">
      <table className={cx('w-full border-collapse text-left text-sm', className)} {...props} />
    </div>
  )
}

export function THead({ className, ...props }: ComponentProps<'thead'>) {
  return <thead className={cx('bg-gradient-to-b from-slate-50 to-slate-100/80 text-slate-600', className)} {...props} />
}

export function TBody(props: ComponentProps<'tbody'>) {
  return <tbody {...props} />
}

export function Tr({ className, ...props }: ComponentProps<'tr'>) {
  return <tr className={cx('border-t border-slate-100 transition-colors hover:bg-teal-50/40', className)} {...props} />
}

export function Th({ className, ...props }: ComponentProps<'th'>) {
  return (
    <th className={cx('px-3 py-2 font-medium', className)} {...props} />
  )
}

export function Td({ className, ...props }: ComponentProps<'td'>) {
  return <td className={cx('px-3 py-2 align-middle', className)} {...props} />
}
