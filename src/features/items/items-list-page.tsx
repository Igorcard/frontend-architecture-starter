import { getRouteApi, Link, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { itemsQueries } from '@core/queries'
import type { Item } from '@core/api/items'
import { DataGrid } from '@pattern/data-grid'
import { PageHeader } from '@pattern/page-header'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

const itemsRouteApi = getRouteApi('/_main/items/')

const emptyItemsSearch = { q: undefined as string | undefined }

export function ItemsListPage() {
  const navigate = useNavigate()
  const search = itemsRouteApi.useSearch()
  const listQuery = useQuery(itemsQueries.list({ q: search.q }))

  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Título',
        cell: ({ row }) => (
          <Link
            to="/items/$itemId"
            params={{ itemId: row.original.id }}
            search={emptyItemsSearch}
            className="font-medium text-teal-900 underline decoration-teal-600/30 underline-offset-2 hover:text-teal-950 hover:decoration-teal-700"
          >
            {row.original.title}
          </Link>
        ),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Atualizado',
        cell: ({ getValue }) => new Date(String(getValue())).toLocaleString(),
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catálogo"
        title="Itens"
        description="Grade com TanStack Table: filtre por título ou descrição (Enter no campo) e abra o detalhe pelo link."
      />
      <DataGrid
        title="Lista"
        data={listQuery.data ?? []}
        columns={columns}
        isLoading={listQuery.isLoading}
        actions={
          <Button
            type="button"
            variant="primary"
            onClick={() =>
              void navigate({
                to: '/items/new',
                search: emptyItemsSearch,
              })
            }
          >
            Novo item
          </Button>
        }
        filters={
          <div className="flex max-w-md gap-2">
            <Input
              placeholder="Filtrar…"
              defaultValue={search.q ?? ''}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return
                const q = (e.target as HTMLInputElement).value
                void navigate({
                  to: '/items',
                  search: { q: q || undefined },
                })
              }}
              aria-label="Filter items"
            />
          </div>
        }
      />
    </div>
  )
}
