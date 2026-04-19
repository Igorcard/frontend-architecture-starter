import { getRouteApi, Link, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { itemsQueries } from '@core/queries'
import { ItemForm } from '@features/items/item-form'
import { useDeleteItem, useUpdateItem } from '@features/items/hooks'
import { Button } from '@ui/button'
import { Loading } from '@ui/loading'

const detailRouteApi = getRouteApi('/_main/items/$itemId')

export function ItemDetailPage() {
  const { itemId } = detailRouteApi.useParams()
  const navigate = useNavigate()
  const itemQuery = useQuery(itemsQueries.detail(itemId))
  const update = useUpdateItem(itemId)
  const del = useDeleteItem()

  if (itemQuery.isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loading />
      </div>
    )
  }

  if (!itemQuery.data) {
    return <p className="text-sm text-zinc-600">Item not found.</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/items"
          search={{ q: undefined }}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          ← Back to items
        </Link>
        <Button
          type="button"
          variant="danger"
          size="sm"
          disabled={del.isPending}
          onClick={() => {
            void (async () => {
              await del.mutateAsync(itemId)
              await navigate({ to: '/items', search: { q: undefined } })
            })()
          }}
        >
          Delete
        </Button>
      </div>
      <ItemForm
        key={itemQuery.data.updatedAt}
        defaultValues={{
          title: itemQuery.data.title,
          description: itemQuery.data.description,
        }}
        submitLabel="Save changes"
        onSubmit={async (values) => {
          await update.mutateAsync(values)
        }}
      />
    </div>
  )
}
