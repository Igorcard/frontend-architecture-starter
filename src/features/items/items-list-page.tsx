import { getRouteApi, Link, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { itemsQueries } from '@core/queries'
import type { Item } from '@core/api/items'
import { DataGrid } from '@pattern/data-grid'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

const itemsRouteApi = getRouteApi('/_main/items')

const emptyItemsSearch = { q: undefined as string | undefined }

export function ItemsListPage() {
  const navigate = useNavigate()
  const search = itemsRouteApi.useSearch()
  const listQuery = useQuery(itemsQueries.list({ q: search.q }))

  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
          <Link
            to="/items/$itemId"
            params={{ itemId: row.original.id }}
            search={emptyItemsSearch}
            className="font-medium text-zinc-900 underline-offset-2 hover:underline"
          >
            {row.original.title}
          </Link>
        ),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated',
        cell: ({ getValue }) => new Date(String(getValue())).toLocaleString(),
      },
    ],
    [],
  )

  return (
    <div className="space-y-4">
      <DataGrid
        title="Items"
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
            New item
          </Button>
        }
        filters={
          <div className="flex max-w-md gap-2">
            <Input
              placeholder="Filter…"
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
