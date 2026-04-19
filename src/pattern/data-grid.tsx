import { DataGridFooter } from '@pattern/data-grid-footer'
import { DataGridHeader } from '@pattern/data-grid-header'
import { DataGridTable, type DataGridTableProps } from '@pattern/data-grid-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type DataGridProps<T> = {
  title?: string
  data: T[]
  columns: ColumnDef<T, unknown>[]
  isLoading?: boolean
  actions?: ReactNode
  filters?: ReactNode
  footer?: ReactNode
}

export function DataGrid<T>({
  title,
  data,
  columns,
  isLoading,
  actions,
  filters,
  footer,
}: DataGridProps<T>) {
  const tableProps: DataGridTableProps<T> = { data, columns, isLoading }
  return (
    <div
      className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
      data-slot="data-grid"
    >
      <DataGridHeader title={title} actions={actions} filters={filters} />
      <div className="p-0">
        <DataGridTable {...tableProps} />
      </div>
      {footer ? <DataGridFooter>{footer}</DataGridFooter> : null}
    </div>
  )
}
