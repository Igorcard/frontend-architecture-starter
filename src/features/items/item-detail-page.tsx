import { getRouteApi, Link, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { itemsQueries } from '@core/queries'
import { ItemForm } from '@features/items/item-form'
import { useDeleteItem, useUpdateItem } from '@features/items/hooks'
import { Button } from '@ui/button'
import { buttonVariants } from '@ui/button.variants'
import { Loading } from '@ui/loading'
import { PageHeader } from '@pattern/page-header'
import { cx } from '@ui/variants'

const detailRouteApi = getRouteApi('/_main/items/$itemId')

export function ItemDetailPage() {
  const { itemId } = detailRouteApi.useParams()
  const navigate = useNavigate()
  const itemQuery = useQuery(itemsQueries.detail(itemId))
  const update = useUpdateItem(itemId)
  const del = useDeleteItem()

  if (itemQuery.isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    )
  }

  if (!itemQuery.data) {
    return (
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/90 px-5 py-6 text-sm text-amber-950 shadow-md">
        Item não encontrado ou removido.
      </div>
    )
  }

  const data = itemQuery.data

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <PageHeader
          eyebrow="Edição"
          title={data.title}
          description="PUT mock persiste alterações; excluir remove e volta para a lista."
        />
        <div className="flex shrink-0 flex-wrap gap-2">
          <Link
            to="/items"
            search={{ q: undefined }}
            className={cx(buttonVariants({ variant: 'secondary', size: 'sm' }))}
          >
            Lista
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
            Excluir
          </Button>
        </div>
      </div>
      <div className="max-w-xl rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-sm md:p-8">
        <ItemForm
          key={data.updatedAt}
          defaultValues={{
            title: data.title,
            description: data.description,
          }}
          submitLabel="Salvar alterações"
          onSubmit={async (values) => {
            await update.mutateAsync(values)
          }}
        />
      </div>
    </div>
  )
}
