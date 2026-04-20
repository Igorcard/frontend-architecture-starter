import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { itemsQueries } from '@core/queries'
import { Loading } from '@ui/loading'
import { buttonVariants } from '@ui/button.variants'
import { PageHeader } from '@pattern/page-header'
import { cx } from '@ui/variants'

const itemsSearch = { q: undefined as string | undefined }

export function DashboardPage() {
  const listQuery = useQuery(itemsQueries.list())
  const items = listQuery.data ?? []
  const newest = items.slice().sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))[0]

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Visão geral"
        title="Painel"
        description="Resumo dos itens de exemplo e atalhos para as rotas principais do demo — tudo funcional com mock MSW."
      />

      <section aria-label="Indicadores">
        <ul className="grid gap-4 sm:grid-cols-3">
          <li className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total de itens</p>
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-slate-900">
              {listQuery.isLoading ? '—' : items.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">Sincronizado com a lista em Itens</p>
          </li>
          <li className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Última atualização</p>
            <p className="mt-2 text-sm font-medium leading-snug text-slate-800">
              {listQuery.isLoading ? (
                'Carregando…'
              ) : newest ? (
                new Date(newest.updatedAt).toLocaleString()
              ) : (
                '—'
              )}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {newest ? `“${newest.title}”` : 'Crie um item para ver a data aqui'}
            </p>
          </li>
          <li className="rounded-2xl border border-teal-200/60 bg-gradient-to-br from-teal-50/90 to-white p-5 shadow-lg shadow-teal-900/5 ring-1 ring-teal-900/5">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-800/80">Ação rápida</p>
            <p className="mt-2 text-sm text-slate-700">Adicione um registro de teste em segundos.</p>
            <Link
              to="/items/new"
              search={itemsSearch}
              className={cx(
                buttonVariants({ variant: 'primary', size: 'sm' }),
                'mt-4 inline-flex w-full justify-center sm:w-auto',
              )}
            >
              Novo item
            </Link>
          </li>
        </ul>
      </section>

      <section aria-label="Atalhos">
        <h2 className="mb-3 font-display text-lg font-semibold text-slate-900">Explorar o app</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          <QuickLink
            to="/items"
            search={itemsSearch}
            title="Grade de itens"
            subtitle="Filtro, links e novo item"
            accent="from-slate-100 to-slate-50"
          />
          <QuickLink
            to="/items/new"
            search={itemsSearch}
            title="Novo item"
            subtitle="Formulário com validação"
            accent="from-teal-100/80 to-teal-50/50"
          />
          <QuickLink
            to="/settings"
            title="Ajustes"
            subtitle="Preferência da sidebar (demo)"
            accent="from-indigo-100/70 to-indigo-50/40"
          />
        </ul>
      </section>

      <section
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-sm"
        aria-labelledby="dashboard-items-heading"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-white via-slate-50/80 to-teal-50/30 px-5 py-4">
          <div>
            <h2 id="dashboard-items-heading" className="font-display text-lg font-semibold text-slate-900">
              Itens recentes
            </h2>
            <p className="text-xs text-slate-500">Clique para abrir o detalhe e editar</p>
          </div>
          <Link
            to="/items"
            search={itemsSearch}
            className={cx(buttonVariants({ variant: 'secondary', size: 'sm' }))}
          >
            Ver todos
          </Link>
        </div>

        <div className="p-5">
          {listQuery.isLoading ? (
            <div className="flex justify-center py-12">
              <Loading />
            </div>
          ) : items.length === 0 ? (
            <p className="text-sm text-slate-600">
              Nenhum item ainda.{' '}
              <Link
                to="/items/new"
                search={itemsSearch}
                className="font-semibold text-teal-800 underline decoration-teal-600/40 underline-offset-2"
              >
                Criar o primeiro
              </Link>
              .
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to="/items/$itemId"
                    params={{ itemId: item.id }}
                    search={itemsSearch}
                    className="block rounded-xl px-3 py-3 transition-colors hover:bg-teal-50/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  >
                    <span className="block font-medium text-slate-900">{item.title}</span>
                    <span className="text-xs text-slate-500">
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

function QuickLink({
  to,
  search,
  title,
  subtitle,
  accent,
}: {
  to: string
  search?: typeof itemsSearch
  title: string
  subtitle: string
  accent: string
}) {
  return (
    <li>
      <Link
        to={to}
        {...(search !== undefined ? { search } : {})}
        className={cx(
          'group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-gradient-to-br p-4 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg',
          accent,
        )}
      >
        <div>
          <p className="font-display text-base font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-xs text-slate-600">{subtitle}</p>
        </div>
        <span className="mt-3 text-xs font-semibold text-teal-800 group-hover:underline">
          Abrir →
        </span>
      </Link>
    </li>
  )
}
