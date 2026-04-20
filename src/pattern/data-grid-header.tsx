import { cx } from '@ui/variants'
import { dataGridToolbarVariants } from '@pattern/data-grid.variants'
import type { ReactNode } from 'react'

export function DataGridHeader({
  title,
  actions,
  filters,
}: {
  title?: string
  actions?: ReactNode
  filters?: ReactNode
}) {
  return (
    <div className={cx(dataGridToolbarVariants())} data-slot="data-grid-header">
      <div className="flex min-w-0 flex-col gap-1">
        {title ? (
          <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
        ) : null}
        {filters}
      </div>
      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </div>
  )
}
