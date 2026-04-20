import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { TBody, Td, Th, THead, Tr, Table } from '@ui/table'

export type DataGridTableProps<T> = {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  isLoading?: boolean
}

export function DataGridTable<T>({ data, columns, isLoading }: DataGridTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-14 text-center">
        <div
          className="size-8 animate-spin rounded-full border-2 border-teal-200 border-t-teal-700"
          role="status"
          aria-label="Carregando"
        />
        <p className="text-sm font-medium text-slate-600">Carregando dados…</p>
      </div>
    )
  }

  return (
    <Table>
      <THead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </Th>
            ))}
          </Tr>
        ))}
      </THead>
      <TBody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
            ))}
          </Tr>
        ))}
      </TBody>
    </Table>
  )
}
