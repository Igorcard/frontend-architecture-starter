import { cx } from '@ui/variants'
import { dataGridFooterVariants } from '@pattern/data-grid.variants'
import type { ReactNode } from 'react'

export function DataGridFooter({ children }: { children?: ReactNode }) {
  return (
    <div className={cx(dataGridFooterVariants())} data-slot="data-grid-footer">
      {children}
    </div>
  )
}
