import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { itemsQueries } from '@core/queries'
import { Loading } from '@ui/loading'
import { buttonVariants } from '@ui/button.variants'
import { cx } from '@ui/variants'

const itemsSearch = { q: undefined as string | undefined }

export function DashboardPage() {
  const listQuery = useQuery(itemsQueries.list())

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-600">
          Visão geral dos seus itens. Use a grade completa em{' '}
          <Link
            to="/items"
            search={itemsSearch}
            className="font-medium text-zinc-900 underline"
          >
            Items
          </Link>{' '}
          para filtrar e criar novos registros.
        </p>
      </div>

      <section
        className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
        aria-labelledby="dashboard-items-heading"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-4 py-3">
          <h2 id="dashboard-items-heading" className="text-sm font-semibold text-zinc-900">
            Itens
          </h2>
          <Link
            to="/items"
            search={itemsSearch}
            className={cx(buttonVariants({ variant: 'secondary', size: 'sm' }))}
          >
            Ver todos
          </Link>
        </div>

        <div className="p-4">
          {listQuery.isLoading ? (
            <div className="flex justify-center py-8">
              <Loading />
            </div>
          ) : listQuery.data?.length === 0 ? (
            <p className="text-sm text-zinc-600">
              Nenhum item ainda.{' '}
              <Link
                to="/items/new"
                search={itemsSearch}
                className="font-medium text-zinc-900 underline"
              >
                Criar o primeiro
              </Link>
              .
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {listQuery.data?.map((item) => (
                <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    to="/items/$itemId"
                    params={{ itemId: item.id }}
                    search={itemsSearch}
                    className="block rounded-md outline-offset-2 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-400"
                  >
                    <span className="block font-medium text-zinc-900">{item.title}</span>
                    <span className="text-xs text-zinc-500">
                      Atualizado {new Date(item.updatedAt).toLocaleString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
